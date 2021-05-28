import express from 'express';
import {body, validationResult} from 'express-validator';
import db from '../../modal/user/index.js';

const router = express.Router();

router.post('/', [
    body("user_email").custom(async (email) => {   
        const users = await db.listUser();
        const checkUser = users.some(item => {
            return item.user_email === email;
        });
        if(checkUser) return Promise.reject('Email de usuário já cadastrado no sistema.');
    }),
    body("password_user").isLength({min: 6, max: 10}).withMessage('Senha deve conter de 6 a 10 caracteres.'),
    body("user_name").isLength({min: 1}).withMessage('Nome não pode ser vazio.'),
], async (req, res) => {
    const {user_email, user_pass, user_name} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({erros: errors.array()});
    } 

    try {
        await db.insertUser(user_email, user_pass, user_name);
        res.status(201).send({message: "Usuário cadastrado com sucesso."}); 
    } catch(err) {
        res.status(500).send({message: `Houve um erro ao conectar com banco de dados. ${err}`});
    }
});

export default router;