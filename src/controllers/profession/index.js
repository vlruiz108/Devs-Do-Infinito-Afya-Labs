import express from 'express';
import db from '../../modal/profession/index.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
  body('profession_name').isLength({min: 1}).withMessage('Profissão não pode ser vazio.')
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({erros: errors.array()});
  } 

  try {
    const {profession_name} = req.body;
    await db.insertProfession(profession_name);
    res.status(201).send({message: 'Profissão cadastrada com sucesso.'});
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
});

export default router;