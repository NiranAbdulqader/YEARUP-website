function redirectToRegistration() {
    window.location.href = 'index.html'; 
}

// Function to handle posting a new post
function postNewPost() {
    const postContent = document.getElementById('postContent').value;

    // Example of posting logic, replace with actual API call to post content
    fetch('https://api.microbloglite.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: 'CurrentUser', // Replace with actual current user
            content: postContent,
            timestamp: new Date().toISOString() // Example timestamp
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to post');
        }
        // Clear input field after successful post
        document.getElementById('postContent').value = '';

        // Display the new post on the page
        displayPost(postContent);
    })
    .catch(error => {
        console.error('Error posting:', error);
    });
}

// Function to display a new post on the page
function displayPost(content) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: CurrentUser`; // Replace with actual current user

    const contentElement = document.createElement('p');
    contentElement.textContent = `Content: ${content}`;

    const timestampElement = document.createElement('p');
    timestampElement.textContent = `Timestamp: ${new Date().toISOString()}`;

    postElement.appendChild(authorElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(timestampElement);

    // Insert the new post at the top of the postsContainer
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}

// Attach postNewPost function to Post button click event
document.getElementById('postButton').addEventListener('click', function() {
    postNewPost();
});

// Function to fetch and display posts (as shown in previous examples)
function fetchPosts() {
    fetch('https://api.microbloglite.com/posts')
    .then(response => response.json())
    .then(data => {
        // Clear existing posts
        document.getElementById('postsContainer').innerHTML = '';

        // Append fetched posts
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${post.author}`;

            const contentElement = document.createElement('p');
            contentElement.textContent = `Content: ${post.content}`;

            const timestampElement = document.createElement('p');
            timestampElement.textContent = `Timestamp: ${post.timestamp}`;

            postElement.appendChild(authorElement);
            postElement.appendChild(contentElement);
            postElement.appendChild(timestampElement);

            document.getElementById('postsContainer').appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
}

// Call fetchPosts function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});

