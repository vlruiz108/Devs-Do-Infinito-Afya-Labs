import express from 'express';
import db from '../../modal/cliente/index.js'
import validationData from '../../services/validations.js'

const router = express.Router();
router.post('/', async (req,res) => {
    try{
        const {zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type} = req.body;
        const valid = validationData.validation(email, blood_type);
        console.log('teste')
        if (valid){
            await db.insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type);
            res.send('Cadastro realizado com sucesso!');
        }else if(valid == 'status1'){
            res.send('Erro ao cadastrar o tipo sanguineo!');
        }else if(valid == 'status2'){
            res.send('Erro ao validar o email!')
        }
    }catch(err){
        res.send(err);
    }
});

export default router;