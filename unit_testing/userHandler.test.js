
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { handleUserGet } from '../private/routeHandlers/user/userHandler.js';
import db from '../private/db/connection.js';

describe('handleUserGet', () => {
    it('should return a user profile page as HTML', async () => {
        //fake profile page request with testuser
        const req = { params: {username: 'testuser' }};
        
        //variables for handler response
        let statusCode = null;
        let contentType = null;
        let body = '';

        //fake response by sendWebResponse()
        const res = { writeHead: (status, headers) => { statusCode = status; contentType = headers['Content-Type']; },
            write: (chunk) => { body += chunk; },
            end: () => {}
        };
    
    try{
        //run the handler
        await handleUserGet(req, res);
        
        //check that the handler returned what's expected
        assert.strictEqual(statusCode, 200);
        assert.strictEqual(contentType, 'text/html');
        assert.ok(body.includes('<title>Profile Page</title>'));
        assert.ok(body.includes('<h2>Posts</h2>'));
        
    } finally {
        //Close MySQL connection 
        db.end();
        }
    });
});

