// Router for "protocol://auth/HERE""

import express from 'express';

import { handleLoginGet, handleLoginPost } from '../routeHandlers/auth/loginHandler.js';
import { handleSignupGet, handleSignupPost } from '../routeHandlers/auth/signupHandler.js';

export default function authRouter(db) {
    const router = express.Router();

    router.get('/login', handleLogin);
    router.get('/signup', handleSignup);

    // for form and db:
    router.post('/login', handleLoginPost(db));
    router.post('/signup', handleSignupPost(db));

    return router;
}