import express from 'express';
import register from './controllers/register/index.js';
import login from './controllers/login/index.js';
import client from './controllers/client/index.js';
import specialist from './controllers/specialist/index.js'

const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/client', client);
router.use('/specialist', specialist);

export default router;