//i will not use a real database for this
import {describe, it, afterEach} from 'node:test';
import assert from 'node:assert';
import { handlePostPost } from '../private/routeHandlers/postHandler.js'
import db from '../private/db/connection.js'

describe ('handlePostPost', () => {
    const originalQuery = db.query;
    afterEach(() => 
    {
        db.query = originalQuery; //restore
    })
    it('should redirect to /post?id=1', async() => {
        //fake input
        const req = 
        {
            body: {
                postHeader: 'Hello',
                postText: 'World'
            }
        };
        //variable to capture result
        let redirectedTo = null;
        //fake output
        const res = {
            redirect: (url) => {
                redirectedTo = url;
            },
            status: () => ({
                send: () => {}
            })
        };
        db.query = (sql, values, callback) => {
            callback(null, {insertId: 1});
        };
        //run the function
        await handlePostPost(req, res);

        //check result
        assert.strictEqual(redirectedTo, '/post?id=1');
    });
});