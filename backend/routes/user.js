import { signup, signin, forgotPassword } from '../controllers/user.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.post('/auth/password/forgot', forgotPassword);

export default router;