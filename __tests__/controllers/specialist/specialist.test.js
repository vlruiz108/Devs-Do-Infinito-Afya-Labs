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

describe('POST /specialist', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .post('/specialist')
      .send({
        "zip_code": "", 
        "street": "Rua Conde", 
        "number": 2531, 
        "district": "Consolação", 
        "locale": "Sampa", 
        "uf": "SP", 
        "register": 656556, 
        "specialist_name": "Paula", 
        "phone": "(23)6327-9563", 
        "cellphone": "(16)56329-4256", 
        "email": "especialistapaula@gmail.com", 
        "id_profession": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

//   test('The test should register a specialist', () => {
//     return request(app)
//       .post('/specialist')
//       .send({
//         "zip_code": 13547655, 
//         "street": "Rua Conde", 
//         "number": 2531, 
//         "district": "Consolação", 
//         "locale": "Sampa", 
//         "uf": "SP", 
//         "register": 656556, 
//         "specialist_name": "Paula", 
//         "phone": "(23)6327-9563", 
//         "cellphone": "(16)56329-4256", 
//         "email": "especialistapaula@gmail.com", 
//         "id_profession": 1
//       })
//       .set('Authorization', `Bearer ${token}`)
//       .then((response) => {
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toEqual({message: 'Cadastro de especialista realizado com sucesso!'});
//       });
//   });

  test('It should require authorization', () => {
    return request(app)
      .post('/specialist')
      .send({
        "zip_code": 13547655, 
        "street": "Rua Conde", 
        "number": 2531, 
        "district": "Consolação", 
        "locale": "Sampa", 
        "uf": "SP", 
        "register": 656556, 
        "specialist_name": "Paula", 
        "phone": "(23)6327-9563", 
        "cellphone": "(16)56329-4256", 
        "email": "especialistapaula@gmail.com", 
        "id_profession": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
}, 15000);

describe('GET /specialist', () => {
  test('It should require authorization', () => {
    return request(app)
      .get('/specialist')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It responds with JSON', () => {
    return request(app)
      .get('/specialist')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

describe('PUT /specialist', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .put('/specialist')
      .send({
        "id_specialist": 1,
        "zip_code": 13547655, 
        "street": "Rua primeiro de maio", 
        "number": 3000, 
        "district": "Consolação", 
        "locale": "Florianopolis", 
        "uf": "TT", 
        "register": 65456, 
        "specialist_name": "Carlos", 
        "phone": "(23)6327-9563", 
        "cellphone": "(16)56329-4256", 
        "email": "especialistanovo@gmail.com", 
        "FK_id_profession": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should change the specialist record', () => {
    return request(app)
      .put('/specialist')
      .send({
        "id_specialist": 1,
        "zip_code": 13547655, 
        "street": "Rua primeiro de maio", 
        "number": 3000, 
        "district": "Consolação", 
        "locale": "Florianopolis", 
        "uf": "SC", 
        "register": 65456, 
        "specialist_name": "Carlos", 
        "phone": "(23)6327-9563", 
        "cellphone": "(16)56329-4256", 
        "email": "especialistanovo@gmail.com", 
        "FK_id_profession": 1
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: `Cadastro de especialista alterado com sucesso!`});
      });
  });

  test('It should require authorization', () => {
    return request(app)
      .put('/specialist')
      .send({
        "id_specialist": 1,
        "zip_code": 13547655, 
        "street": "Rua primeiro de maio", 
        "number": 3000, 
        "district": "Consolação", 
        "locale": "Florianopolis", 
        "uf": "SC", 
        "register": 65456, 
        "specialist_name": "Carlos", 
        "phone": "(23)6327-9563", 
        "cellphone": "(16)56329-4256", 
        "email": "especialistanovo@gmail.com", 
        "FK_id_profession": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});

describe('DELETE /specialist', () => {
    test('It should require authorization (DELETE)', () => {
      return request(app)
        .delete('/specialist/:id_specialist')
        .send({
          "id_specialist": 1
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });
  
    test('It should delete a specialist', () => {
      return request(app)
        .delete('/specialist/:id_specialist')
        .send({
            "id_specialist": 1
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({message: 'Especialista excluido com sucesso.'});
        });
    });
  });
