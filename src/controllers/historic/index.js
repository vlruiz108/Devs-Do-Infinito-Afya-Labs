import express from 'express';
import db from '../../modal/historic/index.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
  body('date_med_reg').isDate().withMessage('Data no formato incorreto.'),
  body('time_med_reg').custom(time => {
    const pattern = /^([0-1][0-9]|[2][0-3]):[0-5][0-9]$/;
    const hour = time.match(pattern);
    if(!hour) return Promise.reject('Horário informado é inválido.');
    return true;
  }),
  body('description').isLength({min: 1, max: 500}).withMessage('Descrição não pode ser vazio e deve ter no máximo 500 caracteres.'),
  body('FK_id_attendances').isNumeric().withMessage('Informe o número do atendimento.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).send({errors: errors.array()});
  }

  const {date_med_reg, time_med_reg, description, FK_id_attendances} = req.body;
  try{
    await db.insertHistoric(date_med_reg, time_med_reg, description, FK_id_attendances);
    res.status(201).send({message: `Agendamento realizado com sucesso!`});
  }catch(err){
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }

});

export default router;