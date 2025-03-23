    const messagesContainer = document.getElementById('messages-container');

    async function fetchPosts() {
        const response = await fetch('localhost:3000/api/posts');
        const data = await response.json();
        return data;
    }

    async function renderData() {
        const data = await fetchPosts(); 
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

    async function addPost() {
        const username = prompt('Please enter your name:');
        const date = new Date().toLocaleDateString();
        const newPost = {
            name: username || 'Anonymous',
            createdAt: date,
            message: input.value.trim(),
        };
        
        if (newPost.message) { 
            const response = await fetch('localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                input.value = '';
                renderData(); 
            } else {
                alert('Error posting your message.');
            }
        } else {
            alert('Please enter a message before posting.');
        }
    }

    addPostBtn.addEventListener('click', addPost);
    renderData();
