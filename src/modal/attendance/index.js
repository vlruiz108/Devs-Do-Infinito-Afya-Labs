import database from '../../repository/connection.js'

async function insertAttendance(schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist){
    const conn = await database.connect();
    const sql = 'CALL sp_insertAttendance(?, ?, ?, ?, ?, ?)';
    const dataNewAttendance = [schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist];
    await conn.query(sql, dataNewAttendance);
}

async function listAttendance() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM vw_list_attendances');
    return rows;
}

async function updateAttendance(schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance) {
    const conn = await database.connect();
    const sql = 'CALL sp_updateAttendance(?, ?, ?, ?, ?, ?, ?)';
    const dataNewAttendanceInfo = [schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance];
    await conn.query(sql, dataNewAttendanceInfo);
}

export default {insertAttendance, listAttendance, updateAttendance}