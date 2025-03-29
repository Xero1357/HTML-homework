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
                    <div class='message-card'>
                        <p><strong>${postedMessage.name}</strong></p>
                        <p>${postedMessage.createdAt}</p>
                        <p>${postedMessage.message}</p>
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