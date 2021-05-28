import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../modal/user/index.js';
import {sendEmail} from '../../services/util/sendEmail.js';

const router = express.Router();
const secret = process.env.JWT_KEY;

router.post('/', async (req, res) => {
  try{
    const {login, password_user} = req.body;
    const users = await db.login(login, password_user);
    if(users.length > 0) {
      const {id_login, login} = users[0];
      const token = jwt.sign({userId: users[0].id_login}, secret, {expiresIn:60 * 60 * 5});
      global.token = {auth: true, token, id_login, login};
      res.send(global.token);
    } else {
      res.send({message: 'Login incorreto'});
    }
  } catch(err) {
    res.send(err);
  }
});

router.post('/reset', async (req, res) => {
  const {user_email} = req.body;
  const user = await db.checkEmail(user_email);
  if(user.length > 0) {
      const key = (Math.random() + 1).toString(36).substring(2).substring(0,10);
      const newPassword = key.replace('n','@').replace('w','!').replace('i','#').replace('t','$').replace('a','*').replace('r','%');
      await db.changePassword(user_email, newPassword);
      sendEmail(user_email, newPassword, user[0].user_name);
      res.send({message: "Nova senha enviada para o seu e-mail"});
  } else {
      res.send({message: 'Usuario não encontrado'});
  }
});

export default router;