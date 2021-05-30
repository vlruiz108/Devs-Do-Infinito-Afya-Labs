import database from '../../repository/connection.js';

async function insertProfession(profession_name) {
  const conn = await database.connect();
  const sql = 'CALL sp_insertProfission(?);';
  await conn.query(sql, profession_name);
}

async function listProfession() {
  const conn = await database.connect();
  const [rows] = await conn.query('SELECT * FROM tbl_professions');
  return rows;
}

async function updateProfession(profession_name, id_profession) {
  const conn = await database.connect();
  const sql = 'CALL sp_updateProfission(?, ?);';
  const dataProfession = [profession_name, id_profession];
  await conn.query(sql, dataProfession);
}



export default {insertProfession, listProfession, updateProfession};