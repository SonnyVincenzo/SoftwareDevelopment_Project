// Router for "protocol://HERE"

import express from 'express';

import { handleIndex } from '../routeHandlers/indexHandler.js';
import { handleAbout } from '../routeHandlers/aboutHandler.js';
import { handleHome } from '../routeHandlers/homeHandler.js';
import { handlePost, handlePostPost } from '../routeHandlers/postHandler.js';

const pageRouter = express.Router();

// Set endpoints.
pageRouter.get(['/', '/index'], handleIndex);
pageRouter.get('/about', handleAbout);
pageRouter.get('/home', handleHome);
pageRouter.get('/post', handlePost);

pageRouter.post('/post', handlePostPost)

export default pageRouter;