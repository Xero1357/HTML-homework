let data = [];

const messagesContainer = document.getElementById('messages-container');

function renderData() {
    messagesContainer.innerHTML = '';

    data.forEach(item => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';

        const nameElement = document.createElement('div');
        nameElement.className = 'name';
        nameElement.textContent = item.name;

        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = item.createdAt;

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = item.message;

        messageCard.appendChild(nameElement);
        messageCard.appendChild(dateElement);
        messageCard.appendChild(messageElement);
        messagesContainer.appendChild(messageCard);
    });
}

const addPostBtn = document.querySelector('button');
const input = document.querySelector('input');

addPostBtn.addEventListener('click', addPost);

function addPost() {
    const username = prompt('Please enter your name:');
    const date = new Date().toLocaleDateString();
    const newPost = {
        name: username || 'Anonymous',
        createdAt: date,
        message: input.value,
    }
    
    data.push(newPost);
    renderData();
    input.value = '';
}

renderData();

// for json
// npm init > into-to-node > https://www.youtube.com/watch?v=tV6tDCrAUWo&t=1s&ab_channel=CodeMatrixZone