import express from 'express';
import register from './controllers/register/index.js';
import login from './controllers/login/index.js';
import client from './controllers/client/index.js';
import specialist from './controllers/specialist/index.js';
import profession from './controllers/profession/index.js';
import attendance from './controllers/attendance/index.js';
import historic from './controllers/historic/index.js';
import reports from './controllers/reports/index.js';
import { verifyJWT } from './middlewares/jwt.js';


const router = express.Router();

router.use('/register', register);
router.use('/login', login);
router.use('/client', verifyJWT, client);
router.use('/specialist', verifyJWT, specialist);
router.use('/profession', verifyJWT, profession);
router.use('/attendance', verifyJWT, attendance);
router.use('/historic', verifyJWT, historic);
router.use('/reports', verifyJWT, reports);
router.use('/*', (req, res) => {
  res.status(404).send({message: 'Caminho não encontrado.'});
});

export default router;