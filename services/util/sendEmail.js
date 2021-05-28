import nodemailer from 'nodemailer';
import {config} from './smtp.js';

const transporter = nodemailer.createTransport(config);

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

export {sendEmail};