import CustomError from '../utils/customError.js';
import DB from '../models/index.js';

const Answer = DB.answer;

const createAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.create({
      ...req.body,
      author: req.userId
    });
    res.status(201).send({
      success: true,
      data: {
        answer
      },
      error: null
    });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

export { createAnswer };
