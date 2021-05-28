import nodemailer from 'nodemailer';
import {config} from './smtp.js';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport(config);
const secret = process.env.JWT_KEY;

function sendEmail(email, newPassword, nome) {
  transporter.sendMail({
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

function generatePassword() {
  const key = (Math.random() + 1).toString(36).substring(2).substring(0,10);
  const newPassword = key.replace('n','@').replace('w','!').replace('i','#').replace('t','$').replace('a','*').replace('r','%');
  return newPassword
}    

function generateToken(id_login, user_name) {
  return jwt.sign({infoUser: {id_login, userName: user_name}}, secret, {expiresIn: 60 * 60 * 5});
}

export {sendEmail, generatePassword, generateToken};