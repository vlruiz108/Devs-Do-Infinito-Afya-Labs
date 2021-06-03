import express from 'express';
import db from '../../modal/user/index.js';
import {sendEmail, generatePassword, generateToken} from '../../services/util/userFeatures.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
  body('user_email').isEmail().withMessage('Informe um e-mail válido.'),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({erros: errors.array()});
  } 

  const {user_email, user_pass} = req.body;
  try{
    const users = await db.login(user_email, user_pass);
    if(users.length > 0) {
      const {id_login, user_name} = users[0];
      const token = generateToken(id_login, user_name);
      res.status(200).send({message: 'Login efetuado com sucesso', token});
    } else {
      res.status(400).send({message: 'Login incorreto'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
});

router.post('/reset', async (req, res) => {
  const {user_email} = req.body;
  try{
    const user = await db.checkEmail(user_email);
    if(user.length > 0) {
      const newPassword = generatePassword();
      await db.changePassword(user_email, newPassword);
      sendEmail(user_email, newPassword, user[0].user_name);
      res.status(200).send({message: "Nova senha enviada para o seu e-mail"});
    } else {
      res.status(404).send({message: 'Usuario não encontrado'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`});
  }
});

export default router;