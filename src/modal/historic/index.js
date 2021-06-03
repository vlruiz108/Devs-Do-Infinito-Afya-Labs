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

export default {insertHistoric, updateHistoric}