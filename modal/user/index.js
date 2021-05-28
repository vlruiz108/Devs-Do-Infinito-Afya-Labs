import database from '../../database/connection.js';

async function insertUser(user_email, user_pass, user_name) {
    const conn = await database.connect();
    const sql = 'CALL sp_registerUsers(?, ?, ?);';
    const newUser = [user_email, user_pass, user_name];
    await conn.query(sql, newUser);
}

async function listUser() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_users');
    return rows;
}

async function login(login, password_user) {
    const conn = await database.connect();
    const sql = 'CALL sp_login(?, ?)';
    const dataLogin = [login, password_user];
    const [rows] = await conn.query(sql, dataLogin);
    return rows[0];
}

async function checkEmail(user_email) {
    const conn = await database.connect();
    const sql = 'CALL sp_checkEmail(?)';
    const [rows] = await conn.query(sql, user_email);
    return rows[0];
}

async function changePassword(user_email, newPassword) {
    const conn = await database.connect();
    const sql = 'CALL sp_changePassword(?, ?)';
    const dataNewPass = [newPassword, user_email];
    await conn.query(sql, dataNewPass);
}

export default {insertUser, listUser, login, checkEmail, changePassword}