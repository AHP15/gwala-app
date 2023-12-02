/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../backend/app.js';
import DB from '../../backend/models/index.js';

const requests = {
  get: () => Request(app).get('/hello'),
};


describe('The root route', () => {
  let responses;
  beforeAll(async () => {
    DB.connect("mongodb://0.0.0.0:27017", 'gwala-test');
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  afterAll(async () => {
    await DB.mongoose.disconnect();
  });

  test('Get /', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Hello there');
  });
});
