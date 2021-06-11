import database from '../../repository/connection.js'

async function insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type){
    const conn = await database.connect();
    const sql = 'CALL sp_insertClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewClient = [zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type];
    await conn.query(sql, dataNewClient);
    conn.end();
}

async function listClient() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM vw_list_clients');
    conn.end();
    return rows;
}

async function updateClient(zip_code, street, number, district, locale, uf, id_address, cpf, name, phone, cellphone, email, blood_type, FK_id_address, id_client) {
    const conn = await database.connect();
    const sql = 'CALL sp_updateClient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const dataNewClientInfo = [zip_code, street, number, district, locale, uf, id_address, cpf, name, phone, cellphone, email, blood_type, FK_id_address, id_client];
    await conn.query(sql, dataNewClientInfo);
    conn.end();
}

async function deleteClient(id_client) {
    const conn = await database.connect();
    const sql = 'CALL sp_deleteClient(?)';
    await conn.query(sql, id_client);
    conn.end();
}

export default {insertClient, listClient, updateClient, deleteClient}