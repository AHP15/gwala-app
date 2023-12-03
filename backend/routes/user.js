import {
  signup,
  signin,
  forgotPassword,
  getProfile,
  signout,
  resetPassword
} from '../controllers/user.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.post('/auth/password/forgot', forgotPassword);
router.put('/auth/password/reset/:token', resetPassword);

router.get('/user/profile', verifyToken, getProfile);
router.get('/auth/signout', signout);

export default router;