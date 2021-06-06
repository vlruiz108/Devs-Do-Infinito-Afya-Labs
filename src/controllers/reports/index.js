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

router.get('/historyForClient/:info_client', async (req, res) => {
  const {info_client} = req.params;
  
  try {
    const historic = await db.historyForClient(info_client);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/historyForSpecialist/:specialist_name', async (req, res) => {
  const {specialist_name} = req.params;
  
  try {
    const historic = await db.historyForSpecialist(specialist_name);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/historyForRegMed/:med_reg', async (req, res) => {
  const {med_reg} = req.params;
  
  try {
    const historic = await db.historyForRegMed(med_reg);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/attendanceForPeriod/', async (req, res) => {
  const initial_date = req.query.initial_date || 0; 
  const final_date = req.query.final_date || 0;

  if(!initial_date || !final_date) 
    return res.status(400).send({message: 'Informe a data inicial e a data final.'});

  try {
    const historic = await db.attendanceForPeriod(initial_date, final_date);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/countSpecialistHistoricInPeriod/', async (req, res) => {
  const initial_date = req.query.initial_date || 0; 
  const final_date = req.query.final_date || 0;

  if(!initial_date || !final_date) 
    return res.status(400).send({message: 'Informe a data inicial e a data final.'});

  try {
    const historic = await db.countSpecialistHistoricInPeriod(initial_date, final_date);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/countProfessionInPeriod/', async (req, res) => {
  const initial_date = req.query.initial_date || 0; 
  const final_date = req.query.final_date || 0;

  if(!initial_date || !final_date) 
    return res.status(400).send({message: 'Informe a data inicial e a data final.'});

  try {
    const historic = await db.countProfessionInPeriod(initial_date, final_date);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/countProfessionInPeriod/', async (req, res) => {
  const initial_date = req.query.initial_date || 0; 
  const final_date = req.query.final_date || 0;

  if(!initial_date || !final_date) 
    return res.status(400).send({message: 'Informe a data inicial e a data final.'});

  try {
    const historic = await db.countProfessionInPeriod(initial_date, final_date);
    if (historic.length > 0){
        return res.status(200).send(historic);
    }else{
        return res.status(404).send({message: 'Sem dados cadastrados para este paciente.'});
    }
  } catch(err) {
    res.status(500).send({message: `Houve um erro no banco de dados. ${err}`})
  }
});

router.get('/countAttendanceForProfission/', async (req, res) => {
  try {
    const historic = await db.countAttendanceForProfission();
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