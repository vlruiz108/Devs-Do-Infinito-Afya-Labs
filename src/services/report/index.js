import database from '../../repository/connection.js';

async function attendanceForSchedule(date_schedule) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceForSchedule(?)';
  const [rows] = await conn.query(sql, date_schedule);
  return rows[0];
}

async function attendanceDate(date_attendance) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceDate(?)';
  const [rows] = await conn.query(sql, date_attendance);
  return rows[0];
}

async function attendanceForClient(name_client) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceForClient(?)';
  const [rows] = await conn.query(sql, name_client);
  return rows[0];
}

async function attendanceForStatus(attendance_status) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceForStatus(?)';
  const [rows] = await conn.query(sql, attendance_status);
  return rows[0];
}

async function attendanceForSpecificSpecialist(name_specialist) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceForSpecificSpecialist(?)';
  const [rows] = await conn.query(sql, name_specialist);
  return rows[0];
}

async function historyForClient(info_client) {
  const conn = await database.connect();
  const sql = 'CALL sp_historyForClient(?)';
  const [rows] = await conn.query(sql, info_client);
  return rows[0];
}

async function historyForSpecialist(specialist_name) {
  const conn = await database.connect();
  const sql = 'CALL sp_historyForSpecialist(?)';
  const [rows] = await conn.query(sql, specialist_name);
  return rows[0];
}

async function historyForRegMed(med_reg) {
  const conn = await database.connect();
  const sql = 'CALL sp_historyForRegMed(?)';
  const [rows] = await conn.query(sql, med_reg);
  return rows[0];
}

async function attendanceForPeriod(initial_date, final_date) {
  const conn = await database.connect();
  const sql = 'CALL sp_attendanceForPeriod(?, ?)';
  const dataInfo = [initial_date, final_date];
  const [rows] = await conn.query(sql, dataInfo);
  return rows[0];
}

async function countSpecialistHistoricInPeriod(initial_date, final_date) {
  const conn = await database.connect();
  const sql = 'CALL sp_countSpecialistInPeriod(?, ?)';
  const dataInfo = [initial_date, final_date];
  const [rows] = await conn.query(sql, dataInfo);
  return rows[0];
}

async function countProfessionInPeriod(initial_date, final_date) {
  const conn = await database.connect();
  const sql = 'CALL sp_countProfessionInPeriod(?, ?)';
  const dataInfo = [initial_date, final_date];
  const [rows] = await conn.query(sql, dataInfo);
  return rows[0];
}

async function countAttendanceForProfission() {
  const conn = await database.connect();
  const sql = 'CALL sp_countAttendanceForProfission()';
  const [rows] = await conn.query(sql);
  return rows[0];
}

export default {
  attendanceForSchedule, 
  attendanceDate, 
  attendanceForClient, 
  attendanceForStatus, 
  attendanceForSpecificSpecialist,
  historyForClient,
  historyForSpecialist,
  historyForRegMed,
  attendanceForPeriod,
  countSpecialistHistoricInPeriod,
  countProfessionInPeriod,
  countAttendanceForProfission
}