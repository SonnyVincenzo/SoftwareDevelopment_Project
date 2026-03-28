const username_password_submit = document.getElementById("submit") 
let username;
let password;


username_password_submit.onclick = function()
{
    //event.preventDefault(); stops page from reload
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username !== "" && password !== "")
    {
        console.log("Name entered: ", username, password);
    }
    else
    {
        console.log("write username and password to enter");
    }
}