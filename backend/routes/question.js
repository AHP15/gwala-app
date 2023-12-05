import { createQuestion, getQuestions, addLike, getQuestion } from '../controllers/question.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/question/new', verifyToken, createQuestion);
router.get('/questions/:location', verifyToken, getQuestions);
router.post('/question/like', verifyToken, addLike);
router.get('/question/:id', verifyToken, getQuestion);

export default router;