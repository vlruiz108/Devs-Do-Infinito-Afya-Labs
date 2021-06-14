const request = require("supertest");
const app = require("../../dist/index").create();
const data = require("../../dist/helpers/validateHour");

describe('Time validation test', () => {
  test('Test should return empty due to wrong time format', () => {
    expect(data.validateTime('25:74')).toEqual(null)
  })

  test('The test must return the time given as input', () => {
    expect(data.validateTime('10:52')[0]).toEqual('10:52')
  })
})
