import express from 'express';
import db from '../../modal/specialist/index.js'
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
    body('zip_code').isLength({min: 8, max: 8}).withMessage('CEP inválido'),
    body('zip_code').isNumeric().withMessage('Entre com um valor numérico de CEP'),
    body('street').isLength({min: 1}).withMessage('Endereço vazio'),
    body('number').isLength({min: 1}).withMessage('Sem número de endereço'),
    body('district').isLength({min: 1}).withMessage('Bairro vazio'),
    body('locale').isLength({min: 1}).withMessage('Cidade vazia'),
    body('uf').custom(uf => {
        const uf_allow = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        if (!uf_allow.includes(uf)){
            return Promise.reject('UF inválida');
        }
        return true;
    }),
    body('register').isNumeric().withMessage('Entre com um valor numérico de número de registro'),
    body('register').isLength({min: 1}).withMessage('Número de registro vazio'),
    body('specialist_name').isLength({min: 1}).withMessage('Nome vazio'),
    body('email').isEmail().withMessage('Entre com um email válido')
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession} = req.body;
    try{
        await db.insertSpecialist(zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, id_profession);
        res.status(201).send({message: 'Cadastro de especialista realizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

router.put('/', [
    body('zip_code').isLength({min: 8, max: 8}).withMessage('CEP inválido'),
    body('zip_code').isNumeric().withMessage('Entre com um valor numérico de CEP'),
    body('street').isLength({min: 1}).withMessage('Endereço vazio'),
    body('number').isLength({min: 1}).withMessage('Sem número de endereço'),
    body('district').isLength({min: 1}).withMessage('Bairro vazio'),
    body('locale').isLength({min: 1}).withMessage('Cidade vazia'),
    body('uf').custom(uf => {
        const uf_allow = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        if (!uf_allow.includes(uf)){
            return Promise.reject('UF inválida');
        }
        return true;
    }),
    body('register').isNumeric().withMessage('Entre com um valor numérico de número de registro'),
    body('register').isLength({min: 1}).withMessage('Número de registro vazio'),
    body('specialist_name').isLength({min: 1}).withMessage('Nome vazio'),
    body('email').isEmail().withMessage('Entre com um email válido')
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {id_specialist, zip_code, street, number, district, locale, uf, register, specialist_name, phone, cellphone, email, FK_id_profession} = req.body;
    const specialists = await db.listSpecialist();
    const specialist = specialists.find(item => {
        if (item.id_specialist == id_specialist){
            return item;
        }
    })
    try{
        const id_address = specialist.id_address;
        const id_specialist = specialist.id_specialist;
        await db.insertSpecialist(zip_code, street, number, district, locale, uf, id_address, register, specialist_name, phone, cellphone, email, zip_code, street, number, district, locale, uf, id_address, register, specialist_name, phone, cellphone, email, FK_id_profession, id_specialist);
        res.status(201).send({message: 'Cadastro de especialista realizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

export default router;
