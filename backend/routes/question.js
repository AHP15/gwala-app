import { createQuestion, getQuestions } from '../controllers/question.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/question/new', verifyToken, createQuestion);
router.post('/question/:location', verifyToken, getQuestions);

export default router;