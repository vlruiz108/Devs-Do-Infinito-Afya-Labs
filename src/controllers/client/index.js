import express from 'express';
import db from '../../services/client/index.js'
import {body, validationResult} from 'express-validator';
import {cpf as validatorCpf} from 'cpf-cnpj-validator'; 

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
    body('cpf').isNumeric().withMessage('Entre com um valor numérico de CPF'),
    body('cpf').custom(async (cpf_input) => {   
        const checkCPF = validatorCpf.isValid(cpf_input);
        if(!checkCPF) return Promise.reject('Número de CPF informado inválido.');
    }),
    body('cpf').custom(async (cpf_input) => {   
        const clients = await db.listClient();
        const checkCPF = clients.some(item => {
            return item.cpf == cpf_input;
        });
        if(checkCPF) return Promise.reject('CPF já cadastrado no sistema.');
    }),
    body('name').isLength({min: 1}).withMessage('Nome vazio'),
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
        res.status(201).send({message: 'Cadastro realizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
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
    body('cpf').isNumeric().withMessage('Entre com um valor numérico de CPF'),
    body('cpf').custom(async (cpf_input) => {   
        const checkCPF = validatorCpf.isValid(cpf_input);
        if(!checkCPF) return Promise.reject('Número de CPF informado inválido.');
    }),
    body('cpf').custom(async (cpf_input) => {   
        const clients = await db.listClient();
        const checkCPF = clients.some(item => {
            return item.cpf === cpf_input;
        });
        if(checkCPF) return Promise.reject('CPF já cadastrado no sistema.');
    }),
    body('name').isLength({min: 1}).withMessage('Nome vazio'),
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
    const {id_client, zip_code, street, number, district, locale, uf, cpf, name, phone, cellphone, email, blood_type} = req.body;
    const clients = await db.listClient();
    const client = clients.find(item => {
        if (item.id_client == id_client){
            return item;
        }
    });
    try{
        const id_address = client.id_address;
        const FK_id_address = client.FK_id_address;
        const id_client = client.id_client;
        await db.updateClient(zip_code, street, number, district, locale, uf, id_address, cpf, name, phone, cellphone, email, blood_type, FK_id_address, id_client);
        res.status(200).send({message: 'Cadastro alterado com sucesso!'});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

router.get('/', async (req, res) => {
    try{
        const clients = await db.listClient();
        if (clients.length > 0){
            const noId = ({id_client, ...rest}) => rest;
            const client = clients.map(item => {
                return {
                    id: item.id_client,
                    ...noId(item)
                }
            });
            return res.status(200).send(client);
        }else{
            return res.status(400).send({message: 'Sem dados cadastrados'});
        }
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

router.get('/:id_client', async (req, res) => {
    try{
        const clients = await db.listClient();
        const {id_client} = req.params;
        const clientFound = clients.find(item => {
            if (item.id_client == id_client){
                return item;
            }
        });
        if (!!clientFound){
            const noId = ({id_client, ...rest}) => rest;
            const client = {
                id: clientFound.id_client,
                ...noId(clientFound)
            }
            return res.status(200).send(client);
        }else{
            return res.status(400).send({message: 'Cliente não encontrado'});
        }
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }
});

router.delete('/:id_client', async (req, res) => {
    const {id_client} = req.params;

    try {
        await db.deleteClient(id_client);
        res.status(200).send({message: 'Cliente excluido com sucesso.'});
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
    }    
});

export default router;