import {body, validationResult} from 'express-validator';

function validateHistoric(req, res, next) {
  [
    body('date_med_reg').isDate().withMessage('Data no formato incorreto.'),
    body('time_med_reg').custom(time => {
      const hour = validateHour(time);
      if(!hour) return Promise.reject('Horário informado é inválido.');
      return true;
    }),
    body('description').isLength({min: 1, max: 500}).withMessage('Descrição não pode ser vazio e deve ter no máximo 500 caracteres.'),
    body('FK_id_attendances').isNumeric().withMessage('Informe o número do atendimento.'),
  ]
  console.log('======================');
  console.log(req)
  const errors = validationResult(req);
  next();
  return errors;
}

export {validateHistoric};