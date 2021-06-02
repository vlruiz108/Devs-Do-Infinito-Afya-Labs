const request = require("supertest");
const app = require("../../src/index");

// import request from 'supertest';
// import app from '../../src/index.js';

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/client")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

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
