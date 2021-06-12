const request = require("supertest");
const app = require("../dist/index").create();

describe("Teste para registro de usuário", () => {
    test("Should response the POST method", done => {
      const payload = {
          "password": 12345678,
          "user_name": "Teste",
          "user_email": Math.random() + "@gmail.com"
      }
      request(app)
        .post("/register/")
        .send(payload)
        .then(response => {
          expect(response.statusCode).toBe(201);
          done();
        });
    },10000);
  });