import { createQuestion, getQuestions, addLike } from '../controllers/question.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/question/new', verifyToken, createQuestion);
router.get('/question/:location', verifyToken, getQuestions);
router.post('/question/like', verifyToken, addLike);

export default router;