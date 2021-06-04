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
router.use('/client', client);
router.use('/specialist', specialist);
router.use('/profession', verifyJWT, profession);
router.use('/attendance', attendance);
router.use('/historic', historic);
router.use('/reports', reports);

export default router;