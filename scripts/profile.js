// Mock function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

// Mock function for logging out
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
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
