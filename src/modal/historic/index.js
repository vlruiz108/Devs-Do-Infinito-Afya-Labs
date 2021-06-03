import database from '../../repository/connection.js'

async function insertHistoric(description, FK_id_attendances){
    const conn = await database.connect();
    const sql = 'CALL sp_insertHistoricMedRegs(?, ?)';
    const dataHistoric = [description, FK_id_attendances];
    await conn.query(sql, dataHistoric);
}

async function updateHistoric(description, id_historic){
    const conn = await database.connect();
    const sql = 'CALL sp_updateHistoryMedRegs(?, ?)';
    const dataHistoric = [description, id_historic];
    await conn.query(sql, dataHistoric);
}

async function listAllHistorics(){
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_historic_med_regs');
    return rows;
}

async function listSpecificHistorics(FK_id_attendances){
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_historic_med_regs WHERE FK_id_attendances = ?';
    const [rows] = await conn.query(sql, FK_id_attendances);
    return rows;
}

export default {insertHistoric, updateHistoric, listAllHistorics, listSpecificHistorics}