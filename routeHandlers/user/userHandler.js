import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';

/**
 * Handles user page request (GET /user/username).
 *
 * @param {import('mysql2').Connection} db
 */
export function handleUser(db) {
    return async (req, res) => {
        const { username } = req.params;

        try {
            db.query(
                'SELECT username, joinDate FROM User WHERE username = ?',
                [username],
                async (err, result) => {
                    if (err) {
                        console.error('User query error:', err);
                        return sendWebResponse(res);
                    }

                    if (result.length === 0) {
                        return sendWebResponse(res, 404, 'text/plain', '404 User Not Found');
                    }

                    const user = result[0];
                    let template = await loadHtml('user.html');
                    template = template.replace('<h1>User</h1>', `User: ${user.username}`);
                    sendWebResponse(res, 200, 'text/html', template);
                }
            );
        } catch (error) {
            console.error('User error:', error);
            sendWebResponse(res);
        }
    };
}