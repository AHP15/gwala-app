/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../../backend/app.js';
import DB from '../../../backend/models/index.js';

const route = '/auth/password/forgot'
const requests = {
  sendEmail: () => Request(app).post(route).send({
    email: 'harkati.web.dev@gmail.com'
  }),
  emailRequired: () => Request(app).post(route).send({}),
  emailExist: () => Request(app).post(route).send({ email: 'unknown@gmail.com' })
};

describe('Forgot password route', () => {
  let responses;

  beforeAll(async () => {
    const randomDbName = Math.random().toString().substring(3);
    DB.connect("mongodb://root:example@0.0.0.0:27017/", randomDbName);
    await DB.user.create({
      email: 'harkati.web.dev@gmail.com',
      password: 'passwordsecret'
    });
    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  test('It should send en email to the user', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.message).toContain('Email sent to harkati.web.dev@gmail.com .Please check your email');
  });

  test('Email should be required', () => {
    const res = responses[1];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null)
    expect(body.error).toContain('No email address provided');
  });

  test('Email should be known', () => {
    const res = responses[2];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(404);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null)
    expect(body.error).toContain('unknown@gmail.com does not exist');
  });
});
