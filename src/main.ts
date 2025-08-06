// main.ts
import { ImporterWorker } from './importerWorker';
import { DataTransformer1, ImportDataCaregiver } from './importerCaregiver';
import { DataTransformer2, ImportDataCarelog } from './importerCarelog';
import { DataTransformer3, ImportDataTblCaregiver } from './importerTblCaregiver';
import { DataTransformer4, ImportDataTblCarelog } from './importerTblCarelog';
import { DataTransformer5, ImportDataTblDocumentation } from './importerTblDocumentation';
import { executeQuery } from './database';

import fs from 'fs/promises';

// read sql file and set content to sqlConent
async function loadSQLFile(name: string): Promise<string> {
  const sqlContent = await fs.readFile(name, 'utf8');
  return sqlContent;
}


async function main() {
    

  try {

    executeQuery("CREATE DATABASE IF NOT EXISTS `wjtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!40100 DEFAULT COLLATE utf8mb4_unicode_ci */;");

    // read sql file
    let strSQL = await loadSQLFile("./sql/create_table_1.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_2.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_3.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_4.sql");
    console.log(strSQL);
    executeQuery(strSQL);
    
    strSQL = await loadSQLFile("./sql/create_table_5.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_6.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_7.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_8.sql");
    console.log(strSQL);
    executeQuery(strSQL);

    strSQL = await loadSQLFile("./sql/create_table_9.sql");
    console.log(strSQL);
    executeQuery(strSQL);


    executeQuery("truncate table wjtest.import_caregiver");
    const importer1 = new ImporterWorker<ImportDataCaregiver, typeof DataTransformer1>(5000);
    await importer1.import('data/caregiver_data_20250415_sanitized.csv', 'import_caregiver', DataTransformer1, false);
    console.log('[Data import finish]: import_caregiver');


    executeQuery("truncate table wjtest.import_carelog");
    const importer2 = new ImporterWorker<ImportDataCarelog, typeof DataTransformer2>(5000); // set batch size
    await importer2.import('data/carelog_data_20250415_sanitized.csv', "import_carelog", DataTransformer2, false);
    console.log('[Data import finish]: import_carelog');



    executeQuery("truncate table wjtest.tbl_caregiver");
    const importer3 = new ImporterWorker<ImportDataTblCaregiver, typeof DataTransformer3>(5000); // set batch size
    await importer3.import('data/caregiver_data_20250415_sanitized.csv', "tbl_caregiver", DataTransformer3, false);
    console.log('[Data import finish]: tbl_caregiver');


    executeQuery("truncate table wjtest.tbl_carelog");
    const importer4 = new ImporterWorker<ImportDataTblCarelog, typeof DataTransformer4>(5000); // set batch size
    await importer4.import('data/carelog_data_20250415_sanitized.csv', "tbl_carelog", DataTransformer4, true);
    console.log('[Data import finish]: tbl_carelog');


    executeQuery("insert into wjtest.tbl_location (locations_id, location_name) \
        select distinct locations_id, location_name \
        from wjtest.import_caregiver \
        ON DUPLICATE KEY UPDATE location_name = VALUES(location_name);"
    );

    executeQuery("insert into wjtest.tbl_franchisor (franchisor_id, new_franchisor_name) \
        select distinct franchisor_id, '' \
        from wjtest.import_caregiver \
        ON DUPLICATE KEY UPDATE new_franchisor_name = '';"
    );


    executeQuery("insert into wjtest.tbl_agency (agency_id, subdomain, franchisor_id) \
        select distinct agency_id, subdomain, franchisor_id \
        from wjtest.import_caregiver \
        ON DUPLICATE KEY UPDATE \
            subdomain = VALUES(subdomain), \
            franchisor_id = VALUES(franchisor_id); "
    );


    executeQuery("truncate table wjtest.tbl_documentation");

    const importer5 = new ImporterWorker<ImportDataTblDocumentation, typeof DataTransformer5>(5000); // set batch size
    await importer5.import('data/carelog_data_20250415_sanitized.csv', "tbl_documentation", DataTransformer5, false);
    console.log('[Data import finish]: tbl_documentation');

    // select carelog_id, count( carelog_id) as aa from import_carelog group by  carelog_id having aa > 1 order by aa desc ;
    //  26147 have mutilple carelog
    // 239884 have 1 carelog
    // 266031 = 239884 + 26147 = count(carelog)


  } catch (error) {
    console.error('[Import failed]:', error);
  }

}

main();

