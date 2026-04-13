import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Handles login page request (GET /auth/login).
 *
 * @async
 * @param {import('express').Request} req - Input from browser; ex: url, query.
 * @param {import('express').Response} res - Output from browser; ex: text/html.
 */
export async function handleLoginGet(req, res) {
    try {
        const template = await loadHtml('login.html');
        sendWebResponse(res, 200, 'text/html', template);
    } catch (error) {
        console.error('Login GET error:', error);
        sendWebResponse(res);
    }
}

/**
 * Handles login form fetching data from db (POST /auth/login).
 *
 * @param {import('mysql2').Connection} db
 */
export function handleLoginPost(db) {
    return async (req, res) => {
        try {
            const { username, password } = req.body; // form data

            db.query(
                'SELECT username, password FROM User WHERE username = ?',
                [username],
                (err, result) => {
                    if (err) {
                        console.error('Login query error:', err);
                        return sendWebResponse(res);
                    }

                    if (result.length === 0) {
                        return sendWebResponse(res, 401, 'text/plain', 'Invalid username or password');
                    }

                    // password check goes here when ready
                    const user = result[0];
                    sendWebResponse(res, 200, 'text/plain', `Welcome, ${user.username}!`);
                }
            );
        } catch (error) {
            console.error('Login POST error:', error);
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    };
}