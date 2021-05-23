import express from 'express';
import db from '../../modal/usuario/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const {login, password_user, name} = req.body;
        const users = await db.listUser();
        const checkUser = users.some(item => {
            return item.login === login;
        });

        if(!login || !password_user || !name) {
            res.send('Dados para cadastro incompletos');
        } else if(checkUser) {
            res.send('Login de usuário já cadastrado no sistema.');
        } else {
            await db.insertUser(login, password_user, name);
            res.send('Usuário cadastrado com sucesso');
        }   
    } catch(err) {
        res.send(err);
    }
});

export default router;