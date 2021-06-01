import database from '../../repository/connection.js'

async function insertHistoric(date_med_reg, time_med_reg, description, FK_id_attendances){
    const conn = await database.connect();
    const sql = 'CALL sp_insertHistoricMedRegs(?, ?, ?, ?)';
    const dataHistoric = [date_med_reg, time_med_reg, description, FK_id_attendances];
    await conn.query(sql, dataHistoric);
}

export default {insertHistoric}