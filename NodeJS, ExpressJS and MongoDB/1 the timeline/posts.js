  let data = [];

  const messagesContainer = document.getElementById('messages-container');
  const addPostBtn = document.getElementById('post-button');
  const input = document.getElementById('message-input');

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

  addPostBtn.addEventListener('click', addPost);

  function addPost() {
      const username = prompt('Please enter your name:');
      const date = new Date().toLocaleDateString();
      const newPost = {
          name: username || 'Anonymous',
          createdAt: date,
          message: input.value,
      }
      
      if (input.value.trim()) { // Check if the input is not empty
          data.push(newPost);
          renderData();
          input.value = '';
      } else {
          alert("Message cannot be empty!");
      }
  }

  renderData();


