import database from '../../repository/connection.js'

async function insertSpecialist(zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession){
    const conn = await database.connect();
    const sql = 'CALL sp_insertSpecialist(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewSpecialist = [zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession];
    await conn.query(sql, dataNewSpecialist);
}

export default {insertSpecialist}