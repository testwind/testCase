// database.ts
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '10.2.204.105',
  user: 'wj',
  port: 23306,
  password: '123456',
  database: 'wjtest',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const createConnection = async () => {
    console.log("db connect == ");
  return await mysql.createConnection(dbConfig);
};

export const executeQuery = async ( query: string) => {
  const connection = await createConnection();
  let res = null;

  try {
      await connection.beginTransaction();
      res = await connection.query(query);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end(); // close database connection
    }

  return res;
};