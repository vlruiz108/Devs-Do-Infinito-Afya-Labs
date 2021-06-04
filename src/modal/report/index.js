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

export default {attendanceForSchedule, attendanceDate, attendanceForClient, attendanceForStatus, attendanceForSpecificSpecialist}