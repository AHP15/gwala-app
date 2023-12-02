/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../../backend/app.js';
import DB from '../../../backend/models/index.js';

const route = '/auth/signin';
const requests = {
  signin: () => Request(app).post(route).send({
    email: 'test@gmail.com',
    password: 'passwordsecret'
  }),
  emailRequired: () => Request(app).post(route).send({
    password: 'passwordsecret'
  }),
  passwordRequired: () => Request(app).post(route).send({
    email: 'c'
  }),
  passwordCorrect: () => Request(app).post(route).send({
    email: 'test@gmail.com',
    password: 'incorrectsecret'
  })
};

describe('Singin route', () => {
  let responses;

  beforeAll(async () => {
    DB.connect("mongodb://0.0.0.0:27017", 'gwala-test');
    await DB.user.create({
      email: 'test@gmail.com',
      password: 'passwordsecret'
    });
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  afterAll(async () => {
    await DB.mongoose.disconnect();
  });

  test('It should signin teh user', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.error).toBe(null);
  });

  test('Email should be required', () => {
    const res = responses[1];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null)
    expect(body.error).toBe('No email address provided');
  });

  test('Password should be required', () => {
    const res = responses[2];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null)
    expect(body.error).toBe('No password provided');
  });

  test('Password should be correct', () => {
    const res = responses[3];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null)
    expect(body.error).toBe('Incorrect Password');
  });
});