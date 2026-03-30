// Router for "protocol://auth/HERE""

import express from 'express';

import { handleLogin, handleLoginPost } from '../routeHandlers/auth/loginHandler.js';
import { handleSignup, handleSignupPost } from '../routeHandlers/auth/signupHandler.js';

const router = express.Router();

// Set endpoints.
router.get('/login', handleLogin);
router.get('/signup', handleSignup);

// For form and db:
router.post('/login', handleLoginPost);
router.post('/signup', handleSignupPost);

export default router;