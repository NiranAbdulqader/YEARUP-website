/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL1 = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server (mirror):   "https://microbloglite.onrender.com"

// NOTE: API documentation is available at /docs 
// For example: http://microbloglite.us-east-2.elasticbeanstalk.com/docs


// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}


// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
const apiBaseURL = 'http://microbloglite.us-east-2.elasticbeanstalk.com';

function login(loginData) {
    // POST /auth/login
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
            // Redirect to the posts page if login is successful
            window.location.assign("posts/MainPosts.html");

            return loginResponse;
        })
        .catch(error => {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        });
}

// Example usage: attach to a login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login({ username, password });
});


// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout () {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}
/////



// Mock function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('login-data') !== null;
}

// Function for logging out
function logout() {
    const loginData = JSON.parse(localStorage.getItem('login-data'));

    if (!loginData) {
        window.location.href = 'index.html';
        return;
    }

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
            localStorage.removeItem("login-data");  // Remove login data from LocalStorage
            window.location.assign("index.html");  // Redirect back to landing page (index.html)
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

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
