import database from '../../repository/connection.js';

async function insertProfession(profession_name) {
  const conn = await database.connect();
  const sql = 'CALL sp_insertProfission(?);';
  await conn.query(sql, profession_name);
}

export default {insertProfession};