import express from 'express';
import db from '../../modal/client/index.js'
import {body, validationResult} from 'express-validator';

const router = express.Router();
router.post('/', [
    body('zip_code').isLength({min: 8, max: 8}).withMessage('CEP inválido'),
    body('zip_code').isNumeric().withMessage('Entre com um valor numérico de CEP'),
    body('email').isEmail().withMessage('Entre com um email válido'),
    body('blood_type').custom(blood => {
        const blood_types_allow = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
        if (!blood_types_allow.includes(blood)){
            return Promise.reject('Tipo sanguíneo inválido');
        }
        return true;
    })
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type} = req.body;
    try{
        await db.insertClient(zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type);
        res.send('Cadastro realizado com sucesso!');
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

export default router;

// VALIDAÇÕES A FAZER!
// TODOS: vazio e se é numerico
//uf tamanho=2 e se é valido (mão)
// cpf duplicado usar custom e bater no DB
//phone tamanho=13
//cellphone = 13-14
//blood tam= 2-3 