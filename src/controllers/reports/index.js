import express from 'express';
import db from '../../modal/report/index.js';

const router = express.Router();

router.get('/attendanceForSchedule/:date_schedule', async (req, res) => {
  const {date_schedule} = req.params;
  
  try {
    const historic = await db.attendanceForSchedule(date_schedule);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/attendanceDate/:date_attendance', async (req, res) => {
  const {date_attendance} = req.params;
  
  try {
    const historic = await db.attendanceDate(date_attendance);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/attendanceForClient/:name_client', async (req, res) => {
  const {name_client} = req.params;
  
  try {
    const historic = await db.attendanceForClient(name_client);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/attendanceForStatus/:attendance_status', async (req, res) => {
  const {attendance_status} = req.params;
  
  try {
    const historic = await db.attendanceForStatus(attendance_status);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/attendanceForSpecificSpecialist/:name_specialist', async (req, res) => {
  const {name_specialist} = req.params;
  
  try {
    const historic = await db.attendanceForSpecificSpecialist(name_specialist);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

export default router;