const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let messages = []; 

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const { name, createdAt, message } = req.body;
    const newMessage = { name, createdAt, message };
    messages.push(newMessage);
    res.json(newMessage); 
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});