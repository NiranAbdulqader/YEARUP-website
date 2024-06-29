

// Event 1: a load event for the page when a user enter the page
window.addEventListener('load', function() {
    alert('Page loaded!');
});

// Event 2, 3, 4
    /* Created a log-in page that uses showcases 3 different event. The events are a form event as the log-in. A submit event for the submit button with onload event to check for validation of the input of data.and a reset option. As well as, a click event to re-direct the user to Welcome page.*/
    // Event 2 is a login form. 3 Event is a submit event for the login with validation critieria. 
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Simple login validation (check if username and password are not empty)
  if (username.trim() === '' || password.trim() === '') {
        // Display invalid input message and change box color to red
    var loginMessage = document.getElementById('login-message');
    loginMessage.textContent = 'Invalid input. Please enter both username and password.';
    loginMessage.style.backgroundColor = '#f8d7da'; // Red background color
    loginMessage.style.borderColor = '#f5c6cb'; // Red border color
    loginMessage.style.display = 'block';
  } else {
        // Display login message and change box color to green
    var loginMessage = document.getElementById('login-message');
    loginMessage.innerHTML = 'Login successful! Click <span id="redirect-link">Welcome</span> to Login.';
    loginMessage.style.backgroundColor = '#d4edda'; // Green background color
    loginMessage.style.borderColor = '#c3e6cb'; // Green border color
    loginMessage.style.display = 'block';

// Event 4: Click event to redirect to the welcome page 
    document.getElementById('redirect-link').addEventListener('click', function() {
        window.location.href = 'index.html';});
  }
});

// Event 5: UI Mouse over event. When the user hovers over the login button, the border color will change to dark blue.
  // UI Event: Hover on login button
document.getElementById('login-btn').addEventListener('mouseover', function() {
    this.style.borderColor = '#0056b3'; // Dark blue border color on hover
});
  
// Event 6: UI Mouse out event. When the user moves the cursor away from the login button, the border color will revert to the original color.
  // UI Event: Hover out of login button
  document.getElementById('login-btn').addEventListener('mouseout', function() {
    this.style.borderColor = '#007bff'; // Original border color
});

// continue to second.js for further events. Event #7, #8, #9, #10 are in second.js


  