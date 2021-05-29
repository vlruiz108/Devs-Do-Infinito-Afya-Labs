import express from 'express';
import register from './controllers/register/index.js';
import login from './controllers/login/index.js';
import client from './controllers/client/index.js';

const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/client', client);

export default router;