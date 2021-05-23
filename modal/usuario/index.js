import database from '../../database/connection.js';

async function insertUser(login, password_user, name) {
    const conn = await database.connect();
    const sql = 'CALL sp_registerUsers(?, ?, ?);';
    const newUser = [login, password_user, name];
    await conn.query(sql, newUser);
}

async function listUser() {
    const conn = await database.connect();
    const [rows] = await conn.query('SELECT * FROM tbl_usuarios');
    return rows;
}

export default {insertUser, listUser}