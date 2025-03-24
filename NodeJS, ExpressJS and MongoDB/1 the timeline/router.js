const express = require('express');
const router = express.Router();

let posts = require('./data').posts; 

router.get('/api/posts', (req, res) => {
    res.json(posts);
});

router.post('/api/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

module.exports = router;