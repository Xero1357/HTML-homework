
const express = require('express');
const router = express.Router();

let posts = require('./data').posts; 

function sortPostsByDate(posts) {
    return posts.sort((a, b) => {
        const dateA = new Date(a.createdAt.split('-').reverse().join('-'));
        const dateB = new Date(b.createdAt.split('-').reverse().join('-'));
        return dateA - dateB; 
    });
}

router.get('/api/posts', (req, res) => {
    const sortedPosts = sortPostsByDate(posts);
    res.json(sortedPosts);
});

router.post('/api/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

module.exports = router;
