import express from 'express';
import db from '../../modal/usuario/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const {login, password_user, name, email} = req.body;
        const users = await db.listUser();
        const checkUser = users.some(item => {
            return item.login === login || item.email === email;
        });

        if(!login || !password_user || !name || !email) {
            res.send({message: 'Dados para cadastro incompletos'});
        } else if(checkUser) {
            res.send({message: 'Login de usuário já cadastrado no sistema.'});
        } else {
            await db.insertUser(login, password_user, name, email);
            res.send({message: 'Usuário cadastrado com sucesso'});
        }   
    } catch(err) {
        res.status(500).send(err);
    }
});

export default router;