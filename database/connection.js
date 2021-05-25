import mysql from 'mysql2/promise';
import 'dotenv/config';

async function connect() {
    const connection = await mysql.createConnection({
        host: process.env.HOST_DB,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
    });
    return connection;
}

export default {connect};