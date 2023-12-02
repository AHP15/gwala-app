/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../../backend/app.js';
import DB from '../../../backend/models/index.js';

const route = '/auth/signup';
const requests = {
  signup: () => Request(app).post(route).send({
    email: 'test@gmail.com',
    password: 'passwordsecret'
  }),
  emailRequired: () => Request(app).post(route).send({
    password: 'passwordsecret'
  }),
  passwordRequired: () => Request(app).post(route).send({
    email: 'test@gmail.com'
  }),
  validateEmail: () => Request(app).post(route).send({
    email: 'testinvalid',
    password: 'passwordsecret'
  }),
  validatePassword: () => Request(app).post(route).send({
    email: 'test@gmail.com',
    password: '123456' // short
  })
};

describe('Signup route', () => {

  let responses;
  beforeAll(async () => {
    DB.connect("mongodb://0.0.0.0:27017", 'gwala-test');
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  afterAll(async () => {
    await DB.mongoose.disconnect();
  });

  test('It should signup a new user', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.message).toBe('user created');
    expect(body.error).toBe(null);
  });

  test('Email should be required', () => {
    const res = responses[1];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe('User email is required');
    expect(body.data).toBe(null);
  });

  test('Password should be required', () => {
    const res = responses[2];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe('User password is required');
    expect(body.data).toBe(null);
  });

  test('Email should be valid', () => {
    const res = responses[3];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe('Invalid email address');
    expect(body.data).toBe(null);
  });

  test('Password should be valid', () => {
    const res = responses[4];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toBe('Password must be at least 8 characters');
    expect(body.data).toBe(null);
  });
})