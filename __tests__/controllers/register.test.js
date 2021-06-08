const request = require("supertest");
const app = require("../../dist/index");
const data = require("../../dist/helpers/validateHour")

describe('Teste para validação de hora', () => {
  test('O teste deve retornar vazio devido ao formato errado da hora', () => {
    expect(data.validateTime('25:74')).toEqual(null)
  })

  test('O teste deve retornar a hora dada comom input', () => {
    expect(data.validateTime('10:52')[0]).toEqual('10:52')
  })
})

describe('Testando GET de register', () => {
  test('siduhfsi', async () => {
    const res = await resquest(app).get('/client')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
})

// import request from 'supertest';
// import app from '../../src/index.js';

// describe("Test the root path", () => {
//   test("It should response the GET method", () => {
//     return request(app)
//       .get("/client")
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//       });
//   });
// });

// describe("Teste para registro de usuário", () => {
//   test("Should response the POST method", done => {
//     const payload = {
//         "user_pass": "senha123",
//         "user_name": "Joao",
//         "user_email": "joao@gmail.com"
//     }
//     request(app)
//       .post("/register")
//       .send(payload)
//       .then(response => {
//         expect(response.statusCode).toBe(201);
//         done();
//       });
//   });
// });

// describe('Sample Test', () => {
//   it('should test that true === true', () => {
//     expect(true).toBe(true)
//   })
// })
