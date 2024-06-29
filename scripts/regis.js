"use strict";

const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = registrationForm.newUsername.value;
    const newPassword = registrationForm.newPassword.value;

    // Save registration data to localStorage
    const userData = {
        username: newUsername,
        password: newPassword,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Redirect to login page
    window.location.href = 'index.html';
});
