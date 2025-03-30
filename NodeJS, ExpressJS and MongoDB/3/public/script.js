document.getElementById('post-button').addEventListener('click', async () => {
    const input = document.getElementById('message-input');
    const username = prompt('Please enter your name:');
    const createdAt = new Date().toLocaleDateString();
    const newPost = {
        name: username || 'Anonymous',
        createdAt: createdAt,
        message: input.value.trim(),
    };

    if (newPost.message) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const postedMessage = await response.json(); // Get the newly added message
                // Append the new post to the messages container
                document.getElementById('messages-container').innerHTML += `
                    <div class='message-card' data-index="${document.querySelectorAll('.message-card').length}">
                        <p><strong>${postedMessage.name}</strong></p>
                        <p>${postedMessage.createdAt}</p>
                        <p class="message-content">${postedMessage.message}</p>
                        <button class="edit-button">Edit</button>
                    </div>
                `;
                input.value = ''; // Clear the input after posting
            } else {
                alert('Failed to post the message');
            }
        } catch (error) {
            console.error('Error posting:', error);
            alert('There was an error. Please try again.');
        }
    } else {
        alert('Please enter a message before posting.');
    }
});

// Handle edit button functionality
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-button')) {
        const messageCard = event.target.closest('.message-card');
        const index = messageCard.getAttribute('data-index');
        const messageContent = messageCard.querySelector('.message-content');

        // Prompt the user to edit their message
        const newMessage = prompt('Edit your message:', messageContent.innerText);

        if (newMessage !== null) {
            const updatedPost = {
                name: messageCard.querySelector('strong').innerText, // Retain the same name
                createdAt: messageCard.querySelector('p:nth-of-type(2)').innerText, // Retain the same date
                message: newMessage.trim(),
            };

            if (updatedPost.message) {
                try {
                    const response = await fetch(`/api/posts/${index}`, { // Change the endpoint to include index
                        method: 'PATCH', // Use PATCH for updating resource
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedPost),
                    });

                    if (response.ok) {
                        // Update the message content in the DOM
                        messageContent.innerText = newMessage;
                    } else {
                        alert('Failed to update the message');
                    }
                } catch (error) {
                    console.error('Error updating:', error);
                    alert('There was an error. Please try again.');
                }
            } else {
                alert('Please enter a message before updating.');
            }
        }
    }
});