const request = require("supertest");
const app = require("../../../dist/index").create();

let token
  
describe("POST /login", () => {
  test("Should login", done => {
    const payload = {
        "password": "senha123456",
        "user_email": "joaozitos@gmail.com"
    }
    request(app)
      .post("/login")
      .send(payload)
      .then(response => {
        token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'Login efetuado com sucesso', token});
        done();
      });
  });

  test("Should not login", done => {
    const payload = {
        "password": "",
        "user_email": "joaozitos@gmail.com"
    }
    request(app)
      .post("/login")
      .send(payload)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({message: 'Login incorreto'});
        done();
      });
  });
});

describe("POST /login/reset", () => {
  test("Should reset password", done => {
    request(app)
      .post("/login/reset")
      .send({
        "user_email": "joao@gmail.com"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Nova senha enviada para o seu e-mail"});
        done();
      });
  });

  test("Should not reset password", done => {
    request(app)
      .post("/login/reset")
      .send({
        "user_email": "ivanildo@gmail.com"
      })
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({message: "Usuario não encontrado"});
        done();
      });
  });
});