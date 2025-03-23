

const express = require('express');
const router = express.Router();

let messages = [];

router.get('/api/messages', (req, res) => {
    res.json(messages);
});

router.post('/api/messages', (req, res) => {
    const { name, message, createdAt } = req.body;

    if (!message) {
        return res.status(400).send('Message is required.');
    }

    const newMessage = {
        name: name || 'Anonymous',
        createdAt: createdAt || new Date().toLocaleDateString(),
        message,
    };

    messages.push(newMessage);
    res.status(201).json(newMessage);
});

module.exports = router;