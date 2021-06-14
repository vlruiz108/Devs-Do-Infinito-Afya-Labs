const request = require("supertest");
const app = require("../../../dist/index").create();

let token;

beforeAll((done) => {
  request(app)
    .post('/login')
    .send({
      "password": "senha123456",
      "user_email": "joaozitos@gmail.com"
    })
    .end((err, response) => {
      token = response.body.token; 
      done();
    });
});

describe('POST /attendance', () => {
    test('The test should return an error due to validations', () => {
      return request(app)
        .post('/attendance')
        .send({
            "attendance_date": "2020-07-42",
            "attendance_time": "13:26",
            "attendance_value": 65,
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2 
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
  
    test('The test should register an attendance', () => {
      return request(app)
        .post('/attendance')
        .send({
            "attendance_date": "2020-07-25",
            "attendance_time": "10:26",
            "attendance_value": 65,
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2 
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toEqual({message: `Agendamento realizado com sucesso!`});
        });
    });
  
    test('It should require authorization', () => {
      return request(app)
        .post('/attendance')
        .send({
            "attendance_date": "2020-07-25",
            "attendance_time": "13:26",
            "attendance_value": 65,
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
});

describe('GET /attendance', () => {
    test('It should require authorization', () => {
      return request(app)
        .get('/attendance')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });
  
    test('It should get the attendances', () => {
      return request(app)
        .get('/attendance')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });
});

describe('PUT /attendance', () => {
    test('The test should return an error due to validations', () => {
      return request(app)
        .put('/attendance')
        .send({
            "attendance_date": "2020-07-10",
            "attendance_time": "27:26",
            "attendance_value": 100,
            "attendance_status": "CANCELADO",
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2,
            "id_attendance": 1
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
  
    test('The test should change the attendance record', () => {
      return request(app)
        .put('/attendance')
        .send({
            "attendance_date": "2020-07-10",
            "attendance_time": "13:26",
            "attendance_value": 100,
            "attendance_status": "CANCELADO",
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2,
            "id_attendance": 1
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({message: `Agendamento atualizado com sucesso!`});
        });
    });
  
    test('It should require authorization', () => {
      return request(app)
        .put('/attendance')
        .send({
            "attendance_date": "2020-07-10",
            "attendance_time": "13:26",
            "attendance_value": 100,
            "attendance_status": "CANCELADO",
            "FK_id_med_reg": 2,
            "FK_id_specialist": 2,
            "id_attendance": 1
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
},15000);
  