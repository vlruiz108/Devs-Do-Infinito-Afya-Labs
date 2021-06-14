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

describe('POST /historic', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .post('/historic')
      .send({
        "description": "",
        "FK_id_attendances": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should register a historic', () => {
    return request(app)
      .post('/historic')
      .send({
        "description": "Teste de prontuário.",
        "FK_id_attendances": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: `Histórico registrado com sucesso!`});
      });
  });

  test('It should require authorization', () => {
    return request(app)
      .post('/historic')
      .send({
        "description": "Teste de prontuário.",
        "FK_id_attendances": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
}, 15000);

describe('GET /historic', () => {
  test('It should require authorization', () => {
    return request(app)
      .get('/historic')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It responds with JSON', () => {
    return request(app)
      .get('/historic')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

describe('PUT /historic', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .put('/historic')
      .send({
        "description": "", 
        "id_historic": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should change the historic record', () => {
    return request(app)
      .put('/historic')
      .send({
        "description": "Teste de prontuário modificado", 
        "id_historic": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: `Atualização realizada com sucesso!`});
      });
  });

  test('It should require authorization', () => {
    return request(app)
      .put('/historic')
      .send({
        "description": "Teste de prontuário modificado", 
        "id_historic": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});
