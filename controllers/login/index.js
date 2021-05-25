import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import db from '../../modal/usuario/index.js';
import {config} from '../../services/smtp.js';

const router = express.Router();
const secret = process.env.JWT_KEY;
const transporter = nodemailer.createTransport(config);

router.post('/', async (req, res) => {
  try{
    const {login, password_user} = req.body;
    const users = await db.login(login, password_user);
    console.log(users)
    if(users.length > 0) {
      const {id_login, login} = users[0];
      const token = jwt.sign({userId: users[0].id_usuario}, secret, {expiresIn:60 * 60 * 5});
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
  const {email} = req.body;
  const user = await db.checkEmail(email);
  if(user.length > 0) {
      const key = (Math.random() + 1).toString(36).substring(2).substring(0,10);
      const newPassword = key.replace('n','@').replace('w','!').replace('i','#').replace('t','$').replace('a','*').replace('r','%');
      await db.changePassword(email, newPassword);
      await sendEmail(email, newPassword, user[0].nome);
      res.send({message: "Nova senha enviada para o seu e-mail"});
  } else {
      res.send({message: 'Usuario não encontrado'});
  }
});

async function sendEmail(email, newPassword, nome) {
  await transporter.sendMail({
    subject: `Redefinição de Senha - AGmed-Afya`,
    from: `Suporte AGmed-Afya <agmed.suporte@gmail.com>`,
    to: `${email}`,
    html: `
    <html>
        <body>
            <p>Olá, ${nome}! tudo bem? 
            <br>Você solicitou a recuperação de senha para o site: <em>devs-agmed-afya</em>.
            Sua nova senha de acesso é: <h3> ${newPassword} </h3> </p>
            <a href="#"> Clique aqui para acessar o site </a>
        </body>
    </html>
    `
  });
}

export default router;