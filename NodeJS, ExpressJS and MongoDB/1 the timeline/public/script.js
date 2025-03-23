let data = [];

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

function addPost() {
    const username = prompt('Please enter your name:');
    const date = new Date().toLocaleDateString();
    const newPost = {
        name: username || 'Anonymous',
        createdAt: date,
        message: input.value.trim(),
    };
    
    if (newPost.message) { 
        data.push(newPost);
        renderData();
        input.value = ''; 
    } else {
        alert('Please enter a message before posting.');
    }
}

renderData();