import express from 'express';
import db from '../../services/profession/index.js';
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

router.get('/', async (req, res) => {
  try {
    const professions = await db.listProfession();
    res.send(professions);
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
});

router.put('/', [
  body('profession_name').isLength({min: 1}).withMessage('Profissão não pode ser vazio.'),
  body('id_profession').isLength({min: 1}).withMessage('O código da profissão não pode ser vazio.'),
  body('id_profession').isNumeric().withMessage('O código da profissão deve ser um valor númerico.'),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({erros: errors.array()});
  } 

  try {
    const {profession_name, id_profession} = req.body;
    await db.updateProfession(profession_name, id_profession);
    res.status(200).send({message: 'Profissão atualizada com sucesso.'});
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
}); 

router.delete('/:id_profession', async (req, res) => {
  const {id_profession} = req.params;

  try {
      await db.deleteProfession(id_profession);
      res.status(200).send({message: 'Profissão excluida com sucesso.'});
  } catch(err) {
      res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }    
});

export default router;