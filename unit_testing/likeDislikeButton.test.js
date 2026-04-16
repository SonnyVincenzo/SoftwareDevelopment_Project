document.body.innerHTML = <button class="like"> &#10084; </button>
document.body.innerHTML = <button class="dislike"> &#10006; </button>

const button = document.getElementsByClassName("like");
const dislikeButton = document.getElementsByClassName("dislike");

const likeTest = jest.fn(); 
button.addEventListener("click", likeTest);
button.click();
expect(likeTest).toHaveBeenCalledTimes(1);

const dislikeTest = jest.fn();
dislikeButton.addEventListener("dislikeClick", dislikeTest);
dislikeButton.dislikeClick();
expect(dislikeTest).toHaveBeenCalledTimes(1);
