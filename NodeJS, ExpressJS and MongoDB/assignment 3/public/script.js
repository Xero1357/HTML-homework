document.getElementById('post-button').addEventListener('click', async () => {
    const input = document.getElementById('message-input');
    const username = prompt('Please enter your name:') || 'Anonymous';
    const newPost = {
        name: username,
        message: input.value.trim(),
        comments: []
    };

    if (newPost.message) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const postedMessage = await response.json();
                document.getElementById('messages-container').innerHTML += `
                    <div class='message-card' data-id="${postedMessage._id}">
                        <p><strong>${postedMessage.name}</strong></p>
                        <p>${new Date(postedMessage.createdAt).toLocaleDateString()}</p>
                        <p class="message-content">${postedMessage.message}</p>
                        <button class="edit-button">Edit</button>
                        <h4>Comments</h4>
                        <div class="comments-container"></div>
                        <input type="text" class="comment-input" placeholder="Your comment here...">
                        <button class="comment-button">Comment</button>
                    </div>
                `;
                input.value = '';
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

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-button')) {
        const messageCard = event.target.closest('.message-card');
        const id = messageCard.getAttribute('data-id');
        const messageContent = messageCard.querySelector('.message-content');

        const newMessage = prompt('Edit your message:', messageContent.innerText);

        if (newMessage !== null) {
            const updatedPost = {
                message: newMessage.trim()
            };

            if (updatedPost.message) {
                try {
                    const response = await fetch(`/api/posts/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedPost),
                    });

                    if (response.ok) {
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

    if (event.target.classList.contains('comment-button')) {
        const messageCard = event.target.closest('.message-card');
        const id = messageCard.getAttribute('data-id');
        const commentInput = messageCard.querySelector('.comment-input');
        const commentMessage = commentInput.value.trim();
        const username = prompt('Please enter your name:') || 'Anonymous';

        if (commentMessage) {
            try {
                const response = await fetch(`/api/posts/${id}/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: username, message: commentMessage })
                });

                if (response.ok) {
                    const postedComment = await response.json();
                    const commentsContainer = messageCard.querySelector('.comments-container');
                    commentsContainer.innerHTML += `<div class="comment"><strong>${postedComment.name}:</strong> ${postedComment.message}</div>`;
                    commentInput.value = '';
                } else {
                    alert('Failed to post the comment.');
                }
            } catch (error) {
                console.error('Error posting comment:', error);
                alert('There was an error. Please try again.');
            }
        } else {
            alert('Please enter a comment before posting.');
        }
    }
});