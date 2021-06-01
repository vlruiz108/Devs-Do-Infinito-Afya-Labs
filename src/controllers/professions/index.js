import express from 'express';
import db from '../../modal/professions/index.js'
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
    body('profession_name').isLength({min: 1}).withMessage('Nome de profissão vazio')
] ,async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {profession_name} = req.body;
    try{
        await db.insertProfession(profession_name);
        res.status(201).send({message: `Cadastro de profissão realizado com sucesso!`});
    }catch(err){
        res.status(400).send({message: `Houve um erro no banco de dados. ${err}`});
    }
})

export default router;