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

describe('GET /profession', () => {
  test('It should require authorization', () => {
    return request(app)
      .get('/profession')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It responds with JSON', () => {
    return request(app)
      .get('/profession')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

describe('POST /profession', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .post('/profession')
      .send({
        "profession_name": ""
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should register a profession', () => {
    return request(app)
      .post('/profession')
      .send({
        "profession_name": "Endocrinologista"
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: 'Profissão cadastrada com sucesso.'});
      });
  });

  test('It should require authorization', () => {
    return request(app)
      .post('/profession')
      .send({
        "profession_name": "Endocrinologista"
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});

describe('PUT /profession', () => {
  test('The test should return an error due to validations (name)', () => {
    return request(app)
      .put('/profession')
      .send({
        "profession_name": "",
        "id_profession": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should return an error due to validations (id)', () => {
    return request(app)
      .put('/profession')
      .send({
        "profession_name": "Cardiologista",
        "id_profession": ""
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should change the profession record', () => {
    return request(app)
      .put('/profession')
      .send({
        "profession_name": "Cardiologista",
        "id_profession": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        // expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: 'Profissão atualizada com sucesso.'});
      });
  });

  test('It should require authorization', () => {
    return request(app)
      .put('/profession')
      .send({
        "profession_name": "Endocrinologista",
        "id_profession": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});
