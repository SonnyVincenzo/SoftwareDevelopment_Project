import { sendWebResponse } from '../methods/responseMethods.js';
import { loadHtml } from '../methods/utilsMethods.js';

/**
 * Handles postFeed page request. (GET / || GET /postFeed)
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handlePostFeedGet(req, res) {
    try {
        const template = await loadHtml('postFeed.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('postFeed GET error:', error);
        sendWebResponse(res);
    }
}