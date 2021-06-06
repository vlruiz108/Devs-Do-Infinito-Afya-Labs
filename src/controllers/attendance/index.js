import express from 'express';
import db from '../../modal/attendance/index.js'
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
    body('attendance_date').custom(date => {
        const pattern = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
        if(!date.match(pattern)) return Promise.reject('A data do atendimento deve estar no formato yyyy:mm:dd hh:mm:ss');
        return true;
      }),
    body('attendance_value').isNumeric().withMessage('Entre com um valor numérico para o attendance_value'),
    body('attendance_value').isLength({min: 1}).withMessage('Attendance_value vazio'),
] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    const {attendance_date, attendance_value, FK_id_med_reg, FK_id_specialist} = req.body;
    try{
        await db.insertAttendance(attendance_date, attendance_value, FK_id_med_reg, FK_id_specialist);
        res.status(201).send({message: `Agendamento realizado com sucesso!`});
    }catch(err){
        res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
    }
});

router.put('/', [
    body('attendance_date').isDate().withMessage('Entra com o formato data para a data do atendimento'),
    body('attendance_value').isNumeric().withMessage('Entre com um valor numérico para o attendance_value'),
    body('attendance_value').isLength({min: 1}).withMessage('Attendance_value vazio'),
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

    const {schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance} = req.body;
    try{
        await db.updateAttendance(schedule_date, attendance_date, attendance_value, attendance_status, FK_id_med_reg, FK_id_specialist, id_attendance);
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