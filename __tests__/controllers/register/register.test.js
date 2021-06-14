const request = require("supertest");
const app = require("../../../dist/index").create();

describe('POST /register', () => {
  test('The test should return an error due to validations', () => {
    return request(app)
      .post('/register')
      .send({
        "password": 12345678,
        "user_name": "Teste",
        "user_email": Math.random() + "gmail.com"
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test('The test should register a user', () => {
    return request(app)
      .post('/register')
      .send({
        "password": "senha123456",
        "user_name": "Teste",
        "user_email": Math.random() + "@gmail.com"
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({message: 'Usuário cadastrado com sucesso.'});
      });
  });
});
