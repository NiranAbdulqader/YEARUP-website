"use strict";

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Retrieve stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData && username === storedUserData.username && password === storedUserData.password) {
        // Successful login, redirect to posts page
        window.location.href = 'posts/postblog.html';
    } else {
        // Invalid credentials, redirect to registration page with message
        alert("Invalid username or password. Please try again.");
        window.location.href = 'registration.html';
    }
});

function redirectToRegistration() {
    window.location.href = 'registration.html'; // Adjust URL as per your project structure
}

