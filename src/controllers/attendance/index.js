import express from 'express';
import db from '../../modal/attendance/index.js'
import {body, validationResult} from 'express-validator';
import {verifyJWT} from '../../middlewares/jwt.js'

const router = express.Router();

router.post('/', [
    body('schedule_date').isDate().withMessage('Entra com o formato data para a data de agendamento'),
    body('attendance_date').isDate().withMessage('Entra com o formato data para a data do atendimento'),
    body('attendance_value').isNumeric().withMessage('Entre com um valor numérico para o attendance_value'),
    body('attendance_value').isLength({min: 1}).withMessage('Attendance_value vazio'),
    body('attendance_status').custom(status => {
        const status_allow = ['AGENDADO', 'REALIZADO', 'CANCELADO'];
        if (!status_allow.includes(status)){
            return Promise.reject('Status inválido');
        }
        return true;
    })
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist} = req.body;
    try{
        await db.insertAttendance(schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist);
        res.status(201).send({message: `Agendamento realizado com sucesso!`});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

export default router;