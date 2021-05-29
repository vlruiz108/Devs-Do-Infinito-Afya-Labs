import database from '../../database/connection.js'

async function insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type){
    const conn = await database.connect();
    const sql = 'CALL sp_insertClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewClient = [zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type];
    await conn.query(sql, dataNewClient);
}

export default {insertClient}