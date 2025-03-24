let data = [];

async function loadPosts() {
    const response = await fetch('/api/posts');
    data = await response.json();
    renderData();
}

const messagesContainer = document.getElementById('messages-container');

function renderData() {
    messagesContainer.innerHTML = '';

    data.forEach(item => {
        messagesContainer.innerHTML += `
            <div class='message-card'>
                <p>${item.name}</p>
                <p>${item.createdAt}</p>
                <p>${item.message}</p>
            </div>
        `;
    });
}

const addPostBtn = document.querySelector('button');
const input = document.querySelector('input');

addPostBtn.addEventListener('click', addPost);

async function addPost() {
    const username = prompt('Please enter your name:');
    const date = new Date().toLocaleDateString();
    const newPost = {
        name: username || 'Anonymous',
        createdAt: date,
        message: input.value.trim(),
    };

    if (newPost.message) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            data.push(newPost);
            renderData();
            input.value = '';
        }
    } else {
        alert('Please enter a message before posting.');
    }
}

loadPosts();