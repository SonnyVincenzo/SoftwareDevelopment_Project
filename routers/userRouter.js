// Router for "protocol://user/HERE"

import express from 'express';

import { handleUserGet } from '../routeHandlers/user/userHandler.js';

export default function userRouter(db) {
    const router = express.Router();

    // ("/:username": allowing "user/someonesUsername")
    router.get('/:username', handleUser(db));

    return router;
}