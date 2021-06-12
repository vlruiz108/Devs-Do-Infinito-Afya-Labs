import express from 'express';
import {body, validationResult} from 'express-validator';
import db from '../../services/user/index.js';
import {verifyJWT} from '../../middlewares/jwt.js';

const router = express.Router();

router.post('/', [
    body('user_email').isEmail().withMessage('Informe um e-mail válido.'),
    body('user_email').custom(async (email) => {   
        const users = await db.listUser();
        const checkEmail = users.some(item => {
            return item.user_email === email;
        });
        if(checkEmail) return Promise.reject('Email de usuário já cadastrado no sistema.');
    }),
    body('user_pass').isLength({min: 6, max: 15}).withMessage('Senha deve conter de 6 a 15 caracteres.'),
    body('user_name').isLength({min: 1}).withMessage('Nome não pode ser vazio.'),
], async (req, res) => {
   const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({erros: errors.array()});
    } 
    
    const {user_email, user_pass, user_name} = req.body;
    try {
        await db.insertUser(user_email, user_pass, user_name);
        res.status(201).send({message: 'Usuário cadastrado com sucesso.'}); 
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

router.put('/', verifyJWT, [
    body('user_email').isEmail().withMessage('Informe um e-mail válido.'),
    body("user_pass").isLength({min: 6, max: 15}).withMessage('Senha deve conter de 6 a 15 caracteres.'),
    body("user_name").isLength({min: 1}).withMessage('Nome não pode ser vazio.'),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({erros: errors.array()});
    } 

    const {user_email, user_pass, user_name} = req.body;
    const {id_login} = req.infoUser;
    const users = await db.listUser();
    const checkEmail = users.some(item => {
        return item.user_email === user_email;
    });
    const checkSameEmail = await db.checkSameEmail(user_email, id_login);
    if(checkSameEmail.length < 1 && checkEmail) {
        return res.status(401).send({message: 'Email de usuário já cadastrado no sistema.'});
    }
    
    try {
        await db.updateUser(user_email, user_pass, user_name, id_login);
        res.status(200).send({message: "Dados alterados com sucesso."}); 
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

router.delete('/:id_login', async (req, res) => {
    const {id_login} = req.params;

    try {
        await db.deleteUser(id_login);
        res.status(200).send({message: 'Usuário excluido com sucesso.'});
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }    
});

export default router;