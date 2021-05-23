import express from 'express';
import db from '../../modal/usuario/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = process.env.JWT_KEY;

router.post('/', async (req, res) => {
  try{
    const {login, password_user} = req.body;
    const users = await db.login(login, password_user);
    if(users.length > 0) {
      const {id_login, login} = users[0];
      const token = jwt.sign({userId: users[0].id_usuario}, secret, {expiresIn:600});
      global.token = {auth: true, token, id_login, login};
      res.send(global.token);
    } else {
      res.send('Login incorreto');
    }
  } catch(err) {
    res.send(err);
  }
});

export default router;