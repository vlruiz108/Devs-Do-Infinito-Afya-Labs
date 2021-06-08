import express from 'express';
import db from '../../services/attendance/index.js'
import {body, validationResult} from 'express-validator';
import {validateTime} from '../../helpers/validateHour.js';

const router = express.Router();

router.post('/', [
    body('attendance_date').isDate().withMessage('Entre com formato de data válido para o atendimento'),
    body('attendance_time').custom(time => {
        const timeValidate = validateTime(time);
        if(!timeValidate) return Promise.reject('Entre com formato de hora válido para o atendimento');
        return true;
    }),
    body('attendance_value').isNumeric().withMessage('Entre com um valor numérico para o valor do atendimento'),
    body('attendance_value').isLength({min: 1}).withMessage('Valor não pode ser vazio'),
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {attendance_date, attendance_time, attendance_value, FK_id_med_reg, FK_id_specialist} = req.body;
    const datetime = `${attendance_date} ${attendance_time}`;
    try{
        await db.insertAttendance(datetime, attendance_value, FK_id_med_reg, FK_id_specialist);
        res.status(201).send({message: `Agendamento realizado com sucesso!`});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

router.put('/', [
    body('attendance_date').isDate().withMessage('Entre com formato de data válido para o atendimento'),
    body('attendance_time').isDate().withMessage('Entre com formato de hora válido para o atendimento'),
    body('attendance_value').isNumeric().withMessage('Entre com um valor numérico para o valor do atendimento'),
    body('attendance_value').isLength({min: 1}).withMessage('Valor não pode ser vazio'),
    body('attendance_time').custom(time => {
        const timeValidate = validateTime(time);
        if(!timeValidate) return Promise.reject('Entre com formato de hora válido para o atendimento');
        return true;
    }),
    body('attendance_status').custom(status => {
        const status_allow = ['AGENDADO', 'REALIZADO', 'CANCELADO'];
        if (!status_allow.includes(status.toUpperCase())){
            return Promise.reject('Status inválido');
        }
        return true;
    })
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }

    const {attendance_date, attendance_time, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance} = req.body;
    const datetime = `${attendance_date} ${attendance_time}`;
    try{
        await db.updateAttendance(datetime, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance);
        res.status(201).send({message: `Agendamento atualizado com sucesso!`});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

router.get('/', async (req, res) => {
    try {
        const attendances = await db.listAttendance();
        if (attendances.length > 0) {
            const noId = ({id_attendance, ...rest}) => rest;
            const attendance = attendances.map(item => {
                return {
                    id: item.id_attendance,
                    ...noId(item)
                }
            });
            return res.status(200).send(attendance);
        } else {
            return res.status(404).send({message: 'Sem dados cadastrados'});
        }
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

router.get('/:id_attendance', async (req, res) => {
    const {id_attendance} = req.params;

    try {
        const attendances = await db.listAttendance();
        const specificAttendance = attendances.find(item => {
            if (item.id_attendance == id_attendance){
                return item;
            }
        });
        if (!!specificAttendance) {
            const noId = ({id_attendance, ...rest}) => rest;
            const attendance = {
                id: specificAttendance.id_attendance,
                ...noId(specificAttendance)
            }
            return res.status(200).send(attendance);
        }else{
            return res.status(404).send({message: 'Atendimento não encontrado'});
        }
    } catch(err) {
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

export default router;