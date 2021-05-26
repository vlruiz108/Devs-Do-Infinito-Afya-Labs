import express from 'express';
import register from './controllers/registrar/index.js';
import login from './controllers/login/index.js';
import client from './controllers/cliente/index.js';

const router = express.Router();

router.use('/registrar', register);
router.use('/login', login);
router.use('/cliente', client)

export default router;