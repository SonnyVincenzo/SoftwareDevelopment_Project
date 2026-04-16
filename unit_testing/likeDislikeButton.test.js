import {describe, it} from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.document = dom.window.document;
global.window = dom.window;

describe("Button tests", () => {
    it("Like Button test", () => {
        document.body.innerHTML = `<button class="like"> &#10084; </button>`;
        const button = document.getElementsByClassName("like")[0];
        let callCount = 0;
        const likeTest = () => {
            callCount++;
        };     
        
        button.addEventListener("click", likeTest);
        button.click();
        assert.strictEqual(callCount, 1 );
    })       

    it("Dislike Button test", () => {
        document.body.innerHTML = `<button class="dislike"> &#10006; </button>`;
        const dislikeButton = document.getElementsByClassName("dislike")[0];
        let dislikeCallCount = 0;
        const dislikeTest = () => {
            dislikeCallCount++;
        }; 

        dislikeButton.addEventListener("click", dislikeTest);
        dislikeButton.click();
        assert.strictEqual(dislikeCallCount, 1 );
    })       
});