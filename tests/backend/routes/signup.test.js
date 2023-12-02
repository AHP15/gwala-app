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
    const randomDbName = Math.random().toString().substring(3);
    DB.connect("mongodb://root:example@0.0.0.0:27017/", randomDbName);
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  test('It should signup a new user', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.message).toBe('user created');
    expect(body.error).toBe(null);
  });

  test('Email should be required', () => {
    const res = responses[1];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('User email is required');
    expect(body.data).toBe(null);
  });

  test('Password should be required', () => {
    const res = responses[2];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('User password is required');
    expect(body.data).toBe(null);
  });

  test('Email should be valid', () => {
    const res = responses[3];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Invalid email address');
    expect(body.data).toBe(null);
  });

  test('Password should be valid', () => {
    const res = responses[4];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Password must be at least 8 characters');
    expect(body.data).toBe(null);
  });
});
