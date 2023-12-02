/* eslint-disable no-undef */
import Request from 'supertest';

import app from '../../../backend/app.js';
import DB from '../../../backend/models/index.js';

const route = '/answer/new';
const agent = Request.agent(app);

describe('Create answer route', () => {
  // let responses;
  let questionId;

  beforeAll(async () => {
    const randomDbName = Math.random().toString().substring(3);
    DB.connect("mongodb://root:example@0.0.0.0:27017/", randomDbName);

    await agent.post('/auth/signup').send({
      email: 'user@gmail.com',
      password: 'passwordsecret'
    });
    const { body } = await agent.post('/question/new').send({
      title: 'question 1',
      content: 'How are you doing?',
      location: 'Theresienhöhe 11, München'
    });

    questionId = body.data.question._id;
  });

  test('It should create an answer', async () => {
    // create answer
    const { statusCode, body } = await agent.post(route).send({
      content: "I'm great thanks",
      question: questionId
    });

    expect(statusCode).toBe(201);
    expect(body.success).toBe(true);
  });

  test('Content should be required', async () => {
    // create answer
    const { statusCode, body } = await agent.post(route).send({
      question: questionId
    });

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Answer content is required');
  });

  test('Question should be required', async () => {
    // create answer
    const { statusCode, body } = await agent.post(route).send({
      content: "I'm great thanks",
    });

    expect(statusCode).toBe(400);
    expect(body.success).toBe(false);
    expect(body.error).toContain('Answer question is required');
  });
});
