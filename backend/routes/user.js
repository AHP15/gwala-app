import { signup, signin } from '../controllers/user.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

export default router;