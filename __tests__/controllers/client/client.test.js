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

describe('POST /client', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .post('/client')
      .send({
        "zip_code": 15324963, 
        "street": "Rua assis", 
        "number": "365", 
        "district": "Jd. Paulista", 
        "locale": "Ribeirão Preto", 
        "uf": "RO", 
        "cpf": "42227523562", 
        "name": "Joao", 
        "phone": "(16)3982-1562", 
        "cellphone": "(12)9369-85265", 
        "email": "joaogatinho@hotmail.com", 
        "blood_type": "TT"
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

//   test('The test should register a client', () => {
//     return request(app)
//       .post('/client')
//       .send({
//         "zip_code": 15324963, 
//         "street": "Rua assis", 
//         "number": "365", 
//         "district": "Jd. Paulista", 
//         "locale": "Ribeirão Preto", 
//         "uf": "RO", 
//         "cpf": "11402401027", 
//         "name": "Joao", 
//         "phone": "(16)3982-1562", 
//         "cellphone": "(12)9369-85265", 
//         "email": "joaogatinho@hotmail.com", 
//         "blood_type": "O-"
//       })
//       .set('Authorization', `Bearer ${token}`)
//       .then((response) => {
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toEqual({message: 'Cadastro realizado com sucesso!'});
//       });
//   });

  test('It should require authorization', () => {
    return request(app)
      .post('/client')
      .send({
        "zip_code": 15324963, 
        "street": "Rua assis", 
        "number": "365", 
        "district": "Jd. Paulista", 
        "locale": "Ribeirão Preto", 
        "uf": "RO", 
        "cpf": "42227523562", 
        "name": "Joao", 
        "phone": "(16)3982-1562", 
        "cellphone": "(12)9369-85265", 
        "email": "joaogatinho@hotmail.com", 
        "blood_type": "O-"
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});

describe('GET /client', () => {
  test('It should require authorization', () => {
    return request(app)
      .get('/client')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It responds with JSON', () => {
    return request(app)
      .get('/client')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

describe('PUT /client', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .put('/client')
      .send({
        "id_client": 1,
        "zip_code": "", 
        "street": "Rua assis", 
        "number": "365", 
        "district": "Jd. Paulista", 
        "locale": "Ribeirão Preto", 
        "uf": "RO", 
        "cpf": "42227523562", 
        "name": "Joao", 
        "phone": "(16)3982-1562", 
        "cellphone": "(12)9369-85265", 
        "email": "joaogatinho@hotmail.com", 
        "blood_type": "O-"
      })
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

//   test('The test should change the client record', () => {
//     return request(app)
//       .put('/client')
//       .send({
//         "id_client": 1,
//         "zip_code": 15324963, 
//         "street": "Rua assis", 
//         "number": "365", 
//         "district": "Jd. Paulista", 
//         "locale": "Ribeirão Preto", 
//         "uf": "RO", 
//         "cpf": "35127872072", 
//         "name": "Joao", 
//         "phone": "(16)3982-1562", 
//         "cellphone": "(12)9369-85265", 
//         "email": "joaogatinho@hotmail.com", 
//         "blood_type": "O-"
//       })
//       .set('Authorization', `Bearer ${token}`)
//       .then((response) => {
//         // expect(response.statusCode).toBe(200);
//         expect(response.body).toEqual({message: 'Cadastro alterado com sucesso!'});
//       });
//   });

  test('It should require authorization', () => {
    return request(app)
      .put('/client')
      .send({
        "id_client": 1,
        "zip_code": 15324963, 
        "street": "Rua assis", 
        "number": "365", 
        "district": "Jd. Paulista", 
        "locale": "Ribeirão Preto", 
        "uf": "RO", 
        "cpf": "42227523562", 
        "name": "Joao", 
        "phone": "(16)3982-1562", 
        "cellphone": "(12)9369-85265", 
        "email": "joaogatinho@hotmail.com", 
        "blood_type": "O-"
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  })
});

describe('DELETE /client', () => {
    test('It should require authorization (DELETE)', () => {
      return request(app)
        .delete('/client/:id_client')
        .send({
          "id_client": 1
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    });
  
    test('It should delete a client', () => {
      return request(app)
        .delete('/client/:id_client')
        .send({
            "id_client": 1
        })
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({message: 'Cliente excluido com sucesso.'});
        });
    });
  });
