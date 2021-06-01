import database from '../../repository/connection.js'

async function insertProfession(profession_name){
    const conn = await database.connect();
    const sql = 'CALL sp_insertProfission(?)';
    const dataNewProfession = [profession_name];
    await conn.query(sql, dataNewProfession);
}

export default {insertProfession}