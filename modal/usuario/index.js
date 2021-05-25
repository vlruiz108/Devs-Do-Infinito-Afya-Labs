import database from '../../database/connection.js';

async function insertUser(login, password_user, name, email) {
    const conn = await database.connect();
    const sql = 'CALL sp_registerUsers(?, ?, ?, ?);';
    const newUser = [login, password_user, name, email];
    await conn.query(sql, newUser);
}

async function listUser() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_usuarios');
    return rows;
}

async function login(login, password_user) {
    const conn = await database.connect();
    const sql = 'CALL sp_login(?, ?)';
    const dataLogin = [login, password_user];
    const [rows] = await conn.query(sql, dataLogin);
    return rows[0];
}

async function checkEmail(email) {
    const conn = await database.connect();
    const sql = 'CALL sp_checkEmail(?)';
    const [rows] = await conn.query(sql, email);
    return rows[0];
}

async function changePassword(email, newPassword) {
    const conn = await database.connect();
    const sql = 'CALL sp_changePassword(?, ?)';
    const dataNewPass = [newPassword, email];
    await conn.query(sql, dataNewPass);
}

export default {insertUser, listUser, login, checkEmail, changePassword}