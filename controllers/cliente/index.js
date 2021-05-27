import express from 'express';
import db from '../../modal/cliente/index.js'

const router = express.Router();
router.post('/', async (req,res) => {
    try{
        const {zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type} = req.body;
        const blood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
        const valid = validation(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type);
        if (valid == true){
            await db.insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type);
            res.send('Cadastro realizado com sucesso!');
        }else{
            res.send("Erro ao cadastrar!");
        }
    }catch(err){
        res.send(err);
    }
});

export default router;