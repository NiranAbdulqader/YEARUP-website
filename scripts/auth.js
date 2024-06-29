"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

// Function to get login data from local storage
function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

// Function to check if the user is logged in
function isLoggedIn() {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

// Function to log in the user
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
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login({ username, password });
});

// Function to log out the user
function logout() {
    const loginData = getLoginData();

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            window.localStorage.removeItem("login-data");
            window.location.assign("index.html");
        });
}

// Redirect to login page if not logged in
if (!isLoggedIn()) {
    window.location.href = 'index.html';
}

// Handle logout button click
document.getElementById('logout-button').addEventListener('click', logout);

// Handle form submission for creating a post
document.getElementById('create-post-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const postContent = document.getElementById('post-content').value;
    const loginData = getLoginData();

    try {
        const response = await fetch(apiBaseURL + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
            },
            body: JSON.stringify({ content: postContent })
        });

        if (response.ok) {
            alert('Post created successfully!');
            document.getElementById('post-content').value = ''; // Clear the textarea
        } else {
            alert('Failed to create post.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
