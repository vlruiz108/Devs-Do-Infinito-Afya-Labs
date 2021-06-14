const request = require("supertest");
const app = require("../dist/index").create();

describe("Test the root path", () => {
    test("It should response the GET method", () => {
      return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });
});
