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