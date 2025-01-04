import express from 'express';
import passport from 'passport';
import { register, login, googleAuthCallback } from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middlewares/validators';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuthCallback
);

export default router; 