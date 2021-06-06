import express from 'express';
import db from '../../services/historic/index.js';
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

router.put('/', [
  body('description').isLength({min: 1, max: 500}).withMessage('Descrição não pode ser vazio e deve ter no máximo 500 caracteres.'),
  body('id_historic').isNumeric().withMessage('Informe o número do atendimento.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).send({errors: errors.array()});
  }

  const {description, id_historic} = req.body;
  try{
    await db.updateHistoric(description, id_historic);
    res.status(201).send({message: `Atualização realizada com sucesso!`});
  }catch(err){
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/', async (req, res) => {
  try {
    const historic = await db.listAllHistorics();
      if (historic.length > 0){
          return res.status(200).send(historic);
      }else{
          return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
      }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/:FK_id_attendances', async (req, res) => {
  const {FK_id_attendances} = req.params;
  try {
    const historic = await db.listSpecificHistorics(FK_id_attendances);
      if (historic.length > 0){
          return res.status(200).send(historic);
      }else{
          return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
      }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

export default router;