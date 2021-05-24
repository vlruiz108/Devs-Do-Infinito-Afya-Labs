import mysql from 'mysql2/promise';
import 'dotenv/config';

async function connect() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    return connection;
}

export default {connect};