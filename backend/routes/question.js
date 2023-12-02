import { createQuestion } from '../controllers/question.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/question/new', verifyToken, createQuestion);

export default router;