import smtp from './emailConfig.js';

const config = {
  host: smtp.host,
  port: smtp.port,
  secure: false,
  auth: {
      user: smtp.user,
      pass: smtp.pass,
  },
  tls: {
      rejectUnauthorized: false,
  },
}

export {config};