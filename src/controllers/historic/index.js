import express from 'express';
import db from '../../modal/historic/index.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
  body('description').isLength({min: 1, max: 500}).withMessage('Descrição não pode ser vazio e deve ter no máximo 500 caracteres.'),
  body('FK_id_attendances').isNumeric().withMessage('Informe o número do atendimento.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).send({errors: errors.array()});
  }

  const {description, FK_id_attendances} = req.body;
  try{
    await db.insertHistoric(description, FK_id_attendances);
    res.status(201).send({message: `Histórico registrado com sucesso!`});
  }catch(err){
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

export default router;