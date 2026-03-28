const username_password_submit = document.getElementById("submit") 
let username;
let password;


username_password_submit.onclick = function()
{
    //event.preventDefault(); //stops page from reload
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username !== "" && password !== "")
    {
        console.log("Name entered: ", username, password);
        //users go to the homepage after login in
        //window.location.href = "test.homepage.html";

        //check if the user already exist
    }
}