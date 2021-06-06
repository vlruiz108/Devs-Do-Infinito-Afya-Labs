import database from '../../repository/connection.js'

async function insertSpecialist(zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession){
    const conn = await database.connect();
    const sql = 'CALL sp_insertSpecialist(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewSpecialist = [zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession];
    await conn.query(sql, dataNewSpecialist);
}

async function listSpecialist() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM vw_list_specialists');
    return rows;
}

async function updateSpecialist(zip_code, street, number, district, locale, uf, id_address, register, specialist_name, phone, cellphone, email, FK_id_profession, id_specialist) {
    const conn = await database.connect();
    const sql = 'CALL sp_updateSpecialist(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewSpecialistInfo = [zip_code, street, number, district, locale, uf, id_address, register, specialist_name, phone, cellphone, email, FK_id_profession, id_specialist];
    await conn.query(sql, dataNewSpecialistInfo);
}

async function deleteSpecialist(id_specialist) {
    const conn = await database.connect();
    const sql = 'CALL sp_deleteSpecialist(?)';
    await conn.query(sql, id_specialist);
}

export default {insertSpecialist, listSpecialist, updateSpecialist, deleteSpecialist}