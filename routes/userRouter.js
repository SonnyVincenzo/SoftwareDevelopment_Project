// Router for "protocol://user/HERE"

import express from 'express';

import { handleUser } from '../routeHandlers/user/userHandler.js';

const router = express.Router();

// Set endpoints. ("/:username": allowing "user/someonesUsername")
router.get('/:username', handleUser);

export default router;