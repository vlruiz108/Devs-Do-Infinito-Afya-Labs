import express from 'express';
import db from '../../modal/client/index.js'
import {body, validationResult} from 'express-validator';
import {verifyJWT} from '../../middlewares/jwt.js'

const router = express.Router();

// router.post('/', verifyJWT, [
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
    body('cpf').isLength({min: 11, max: 11}).withMessage('CPF inválido'),
    body('cpf').isNumeric().withMessage('Entre com um valor numérico de CPF'),
    body('cpf').custom(async (cpf_input) => {   
        const clients = await db.listClient();
        const checkCPF = clients.some(item => {
            return item.cpf === cpf_input;
        });
        if(checkCPF) return Promise.reject('CPF já cadastrado no sistema.');
    }),
    body('name').isLength({min: 1}).withMessage('Nome vazio'),
    body('phone').isLength({min:13 , max:13}).withMessage('Telefone fixo inválido'),
    body('cellphone').isLength({min:13 , max:14}).withMessage('Celular inválido'),
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
// cpf duplicado usar custom e bater no DB
// olhar email, cell e tell para fazer de forma que todos possa ir juntos
