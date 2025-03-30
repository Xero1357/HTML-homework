const express = require('express');
const router = express.Router();

module.exports = (posts) => {
    // GET /api/posts - Fetch all posts
    router.get('/api/posts', (req, res) => {
        res.json(posts);
    });

    // POST /api/posts - Create a new post
    router.post('/api/posts', (req, res) => {
        const newPost = req.body;

        if (newPost && newPost.name && newPost.message) {
            posts.push(newPost);
            res.status(201).json(newPost);
        } else {
            res.status(400).send('Invalid post data'); // Respond with an error for invalid data
        }
    });

    // PATCH /api/posts/:index - Update a specific post
    router.patch('/api/posts/:index', (req, res) => {
        const index = req.params.index; // Get the index from the request parameters
        const updatedPost = req.body;

        if (index >= 0 && index < posts.length && updatedPost && updatedPost.message) {
            posts[index].message = updatedPost.message; // Update the message
            res.status(200).json(posts[index]); // Respond with the updated post
        } else {
            res.status(400).send('Invalid update data'); // Respond with an error for invalid data
        }
    });

    return router;
};