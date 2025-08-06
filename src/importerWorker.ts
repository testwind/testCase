// importerWorker.ts
import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';
import { createConnection } from './database';
import { DataTransformer } from './dataTransformer';


// stream import class
export class ImporterWorker<T extends {},R extends typeof DataTransformer> {
  private tableName = 'import_caregiver_s';
  
  constructor(private batchSize: number = 500) {}

  async import(filePath: string, tableName: string = "", transformerClass: R, useUpsert: boolean = false): Promise<void> {
    const connection = await createConnection();

    if (tableName.length > 0) {
      this.tableName = tableName;
    }
    
    return new Promise(async (resolve, reject) => {
      let batch: T[] = [];  // ImportDataCaregiver
      let rowCount = 0;
      let isProcessing = false;

      const stream = fs.createReadStream(filePath).pipe(csv());
      
      const processBatch = async () => {
        if (batch.length === 0) return;

        isProcessing = true;

        try {
            await this.insertBatch(connection, batch, useUpsert);
            rowCount += batch.length;
            console.log(`Process finish ${rowCount} rows`);
            batch = [];
        } catch (error) {
            console.error('Insert failed:', error);
            fs.writeFileSync('failed_batch.log', JSON.stringify(batch, null, 2) + '\n', { flag: 'a' });
        } finally {
            isProcessing = false;
            stream.resume(); // read next batch
        }
    };

      stream
        .on('data', (row: any) => { //  (row: CSVRow)
          try {
            const transformed = transformerClass.transform(row); // DataTransformer1.transform(row);
            batch.push(transformed);

           if (batch.length >= this.batchSize) {
                stream.pause(); // pause stream
                process.nextTick(async () => {
                    await processBatch(); // processBatch();
                });
                }
            } catch (error) {
                console.error('Data transfer failed:', row);
                stream.destroy(error as Error);
            }
        })
        .on('end', async () => {
          try {
                console.log(`stream finish, process the last batch data，remain ${batch.length} rows`);
                if (batch.length > 0) {
                await processBatch(); // process the last batch
                }
                console.log(`Import finish，Total ${rowCount} rows`);
                resolve();
            } catch (error) {
                reject(error);
            } finally {
                await connection.end();
            }
        })
        .on('error', (error) => {
          reject(error);
          stream.destroy(error as Error);
        })
        .on('close', async () => {
          if (!isProcessing && batch.length > 0) {
            await processBatch();
          }
        });

        stream.on('pause', () => {
            console.log('stream pause');
        });

        stream.on('resume', () => {
            console.log('stream resume');
        });


    });
  }

  private async insertBatch(
    connection: mysql.Connection, 
    batch: T[], 
    useUpsert: boolean = false
  ): Promise<void> {
    if (batch.length === 0) return;

    const columns = Object.keys(batch[0]);
    const columnCount = columns.length;

    // create placeholders for each row in the batch
    const rowPlaceholder = `(${Array(columnCount).fill('?').join(', ')})`;
    const placeholders = Array(batch.length).fill(rowPlaceholder).join(', ');

    let sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES ${placeholders} `;

    if ( useUpsert ) {
      sql += ' ON DUPLICATE KEY UPDATE ' + columns.map(column => `${column} = VALUES(${column})`).join(', ');
    }
    
    // console.log(sql);
    // flatmap the data
    const values = batch.flatMap(row => 
      Object.values(row).map(value => value === undefined ? null : value)
    );

    try {
      await connection.beginTransaction();
      await connection.query(sql, values);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }
}