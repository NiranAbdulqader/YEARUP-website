
        // Attach the login function to the login form submission
        document.getElementById('login').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            login({ username, password });
        });

        // Redirect to registration page
        function redirectToRegistration() {
            window.location.assign("registration.html");
        }

        // Redirect to login page if not logged in
        if (!isLoggedIn()) {
            window.location.href = 'index.html';
        }