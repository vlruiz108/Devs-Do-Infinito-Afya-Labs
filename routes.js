import express from 'express';
import registrar from './controllers/registrar/index.js';
import login from './controllers/login/index.js';

const router = express.Router();

router.use('/registrar', registrar);
router.use('/login', login);

export default router;