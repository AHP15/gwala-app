/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../../backend/app.js';
import DB from '../../../backend/models/index.js';

const route = '/question/new';
const agent = Request.agent(app);

const requests = {
  createQuestion: () => agent.post(route).send({
    title: 'question 1',
    content: 'How are you doing?',
    location: 'Theresienhöhe 11, München'
  }),
  titleRequired: () => agent.post(route).send({
    content: 'How are you doing?',
    location: 'Theresienhöhe 11, München'
  }),
  contentRequired: () => agent.post(route).send({
    title: 'question 1',
    location: 'Theresienhöhe 11, München'
  }),
  locationRequired: () => agent.post(route).send({
    title: 'question 1',
    content: 'How are you doing?',
  }),
};

describe('Create question route', () => {
  let responses;

  beforeAll(async () => {
    const randomDbName = Math.random().toString().substring(3);
    DB.connect("mongodb://root:example@0.0.0.0:27017/", randomDbName);

    // create a user
    await DB.user.create({
      email: 'user@gmail.com',
      password: 'passwordsecret'
    });
    // signin a user
    await agent.post('/auth/signin').send({
      email: 'user@gmail.com',
      password: 'passwordsecret'
    });

    responses = await Promise.allSettled(Object.values(requests).map(req => req()));
  });

  test('Is should create a question', () => {
    const res = responses[0];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(201);
    expect(body.success).toBe(true);
  });

  test('Title should be required', () => {
    const res = responses[1];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null);
    expect(body.error).toContain('Question title is required');
  });

  test('Content should be required', () => {
    const res = responses[2];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null);
    expect(body.error).toContain('Question content is required');
  });

  test('Location should be required', () => {
    const res = responses[3];
    const { statusCode, body } = res.value;

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data).toBe(null);
    expect(body.error).toContain('Question location is required');
  });
});