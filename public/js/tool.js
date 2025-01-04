const checkPasswordAuth = async () => {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username.length === 0 || password.length === 0) {

            alert("Username or Password cannot be empty")
        }

        else {

            const response = await fetch("http://localhost:3000/checklogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Redirect to dashboard or home page
                window.location.replace("http://localhost:3000/dashboard");
            } else {
                // Show error message
                alert("Invalid username or password. Please try again.");
            }

        }

    } catch (error) {
        console.error("Error during authentication:", error);
    }
};

const registerUser = async () => {

    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;

    if (password != repassword) {
        alert("Passwords don't match")
    }

    else if (username.length === 0 || name.length === 0 || email.length === 0 || password.length === 0 || repassword.length ===0) {

        alert("Please fill all the fields")
    }

    else {

        const response = await fetch("http://localhost:3000/registeruser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, username,email, password, repassword }),
        });

        const data = await response.json();

        if (data.success) {

            alert(data.message)
            window.location.replace("http://localhost:3000/login")
        } else {

            alert(data.message)
        }
        
}
    
}


const redirectToRegister = () => {

    window.location.replace("http://localhost:3000/register")
}


const redirectToLogin = () => {

    window.location.replace("http://localhost:3000/login")
}

