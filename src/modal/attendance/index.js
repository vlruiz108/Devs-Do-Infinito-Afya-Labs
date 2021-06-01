import database from '../../repository/connection.js'

async function insertAttendance(schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist){
    const conn = await database.connect();
    const sql = 'CALL sp_insertAttendance(?, ?, ?, ?, ?, ?)';
    const dataNewAttendance = [schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist];
    await conn.query(sql, dataNewAttendance);
}

export default {insertAttendance}