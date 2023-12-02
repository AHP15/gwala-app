import opencage from 'opencage-api-client';

import DB from '../models/index.js';
import CustomError from '../utils/customError.js';

const Question = DB.question;

const createQuestion = async (req, res, next) => {
  try {
    const { title, content, location } = req.body;

    if (!location) {
      throw new Error('validation failed: Question location is required');
    }

    const data = await opencage.geocode({ q: location });
    const place = data.results[0];

    const question = await Question.create({
      title,
      content,
      location: {
        type: 'Point',
        coordinates: [place.geometry.lng, place.geometry.lat],
      },
      locationName: location,
      author: req.userId
    });

    res.status(201).send({
      success: true,
      data: {
        question
      },
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const data = await opencage.geocode({ q: req.params.location });
    const place = data.results[0];

    const questions = await Question.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [place.geometry.lng, place.geometry.lat],
          },
        },
      },
    });

    res.status(200).send({
      success: true,
      data: {
        questions
      },
      error: null
    });

  } catch (err) {
    next(new CustomError(err.message));
  }
};

export { createQuestion, getQuestions };
