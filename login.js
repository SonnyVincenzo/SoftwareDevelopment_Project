const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn"); 

//login
loginBtn.onclick = async function()
{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });

    if(response.ok)
    {
        alert("Login Successful");
    }
    else 
    {
        alert(this.dataset.error);
    }
}