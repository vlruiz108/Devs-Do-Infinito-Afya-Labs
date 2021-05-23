import express from 'express';
import registrar from './controllers/registrar/index.js';

const router = express.Router();

router.use('/registrar', registrar);

export default router;