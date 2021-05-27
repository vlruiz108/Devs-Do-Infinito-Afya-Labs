import mysql from 'mysql2/promise';
import 'dotenv/config';

async function connect() {
    const dataConn = process.env.NODE_ENV === 'production' ? {
        host: process.env.PROD_HOST_DB,
        user: process.env.PROD_USER_DB,
        password: process.env.PROD_PASSWORD_DB,
        database: process.env.PROD_DATABASE,
        ssl: {
            rejectUnauthorized: false,
        }
    } : 
    {
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
    }
  
    const connection = await mysql.createConnection(dataConn);
    return connection;
}

export default {connect};