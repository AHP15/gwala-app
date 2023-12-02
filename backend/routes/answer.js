import express from 'express';

import { verifyToken } from '../middlewares/jwt.js';
import { createAnswer } from '../controllers/answer.js';

const router = express.Router();

router.post('/answer/new', verifyToken, createAnswer)

export default router;
