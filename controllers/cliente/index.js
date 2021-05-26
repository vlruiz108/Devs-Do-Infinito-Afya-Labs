import express from 'express';
import db from '../../modal/cliente/index.js'

const router = express.Router();
router.post('/', async (req,res) => {
    const {zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type} = req.body
    await db.insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type)
    res.send('Cadastro realizado com sucesso!')
});

export default router;