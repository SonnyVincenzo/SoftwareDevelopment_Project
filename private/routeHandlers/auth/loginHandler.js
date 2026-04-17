import { sendWebResponse } from '../../methods/responseMethods.js';
import { loadHtml } from '../../methods/utilsMethods.js';
import db from '../../db/connection.js';
import bcrypt from 'bcrypt';

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
 * Creates User handler for GET.
 * Wrapper function to enable db content handling. 
 * 
 * @param {import('mysql2'.Connection)} db - Database.
 * @returns 
 */
export function createLoginPostHandler(db) {

    /**
     * Handles login form fetching data from db (POST /auth/login).
     *
     * @async
     * @param {import('express').Request} req - Input from browser; ex: url, query.
     * @param {import('express').Response} res - Output from browser; ex: text/html.
     */
    return async function handleLoginPost(req, res) {
        try {
    
            const plainUsername = req.body.username;
            const plainPassword = req.body.password;

            const username = typeof plainUsername == "string" ? plainUsername.trim(): "";
            const password = typeof plainPassword == "string" ? plainPassword : "";
            
            if(!username || !password){
                return sendWebResponse(res, 400,"text/plain", "username and password are required");
            }

            db.query(
                'SELECT username, password FROM User WHERE username = ?',
                [username],
                async (err, result) =>{
                    if (err) {
                        console.error('Login query error:', err);
                        return sendWebResponse(res, 403, 'text/plain', 'Invalid login query.');
                    }

                    if (result.length === 0) {
                        return sendWebResponse(res, 401, 'text/plain', 'Invalid username or password');
                    }

                    try{
                        const user = result[0];
                        const isMatch = await bcrypt.compare(password, user.password);

                    if(!isMatch){
                        return sendWebResponse(res,401, "text/plain", "Invalid username or password");
                    }

                    res.redirect(`/user/${user.username}`);
                    }catch(err){
                        console.error("Login error", err);
                        sendWebResponse(res, 500, "text/plain", "500 internal server error");
                    }  
                }        
            );

        } catch (error) {
            console.error('Login POST error:', error);
            sendWebResponse(res, 500, 'text/plain', '500 Internal Server Error');
        }
    }
}