// auth.js

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

function login(loginData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginResponse => {
            if (loginResponse.message === "Invalid username or password") {
                console.error("Invalid login:", loginResponse.message);
                alert("Invalid username or password. Please try again.");
                return null;
            }

            console.log("Login successful. Redirecting to posts page...");
            window.localStorage.setItem("login-data", JSON.stringify(loginResponse));
            window.location.assign("posts/MainPosts.html");

            return loginResponse;
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        });
}

// Attach the login function to the login form submission
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login({ username, password });
});

function redirectToRegistration() {
    window.location.href = 'registration.html';
}

if (!isLoggedIn()) {
    window.location.href = 'index.html';
}
