import database from '../../repository/connection.js';

async function insertUser(user_email, user_pass, user_name) {
    const conn = await database.connect();
    const sql = 'CALL sp_registerUsers(?, ?, ?);';
    const newUser = [user_email, user_pass, user_name];
    await conn.query(sql, newUser);
    conn.end();
}

async function listUser() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_users');
    conn.end();
    return rows;
}

async function checkSameEmail(email, id_login) {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_users WHERE user_email = ? AND id_login = ?';
    const dataUser = [email, id_login];
    const [rows] = await conn.query(sql, dataUser);
    conn.end();
    return rows;
}

async function login(user_email, user_pass) {
    const conn = await database.connect();
    const sql = 'CALL sp_login(?, ?)';
    const dataLogin = [user_email, user_pass];
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();
    return rows[0];
}

async function checkEmail(user_email) {
    const conn = await database.connect();
    const sql = 'CALL sp_checkEmail(?)';
    const [rows] = await conn.query(sql, user_email);
    conn.end();
    return rows[0];
}

async function changePassword(user_email, newPassword) {
    const conn = await database.connect();
    const sql = 'CALL sp_changePassword(?, ?)';
    const dataNewPass = [newPassword, user_email];
    await conn.query(sql, dataNewPass);
    conn.end();
}

async function updateUser(user_email, user_pass, user_name, id_login) {
    const conn = await database.connect();
    const sql = 'CALL sp_updateUsers(?, ?, ?, ?)';
    const dataNewPass = [user_email, user_pass, user_name, id_login];
    await conn.query(sql, dataNewPass);
    conn.end();
}

async function deleteUser(id_login) {
    const conn = await database.connect();
    const sql = 'CALL sp_DeleteUsers(?)';
    await conn.query(sql, id_login);
    conn.end();
}

export default {
    insertUser, 
    listUser, 
    login, 
    checkEmail, 
    changePassword, 
    updateUser, 
    checkSameEmail,
    deleteUser
}