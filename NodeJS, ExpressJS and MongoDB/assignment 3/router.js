const express = require('express');
const fs = require('fs').promises; // Use promises API
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

async function loadPosts() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read data file:", error);
        return []; // Return an empty array if the file doesn't exist or has bad content
    }
}

async function savePosts(posts) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error("Could not write to data file:", error);
    }
}

const router = express.Router();

// GET /api/posts - Fetch all posts
router.get('/api/posts', async (req, res) => {
    const currentPosts = await loadPosts(); // Load from file
    res.json(currentPosts);
});

// POST /api/posts - Create a new post
router.post('/api/posts', async (req, res) => {
    const newPost = {
        name: req.body.name,
        createdAt: req.body.createdAt,
        message: req.body.message,
        comments: [] // Initialize an empty comments array
    };

    if (newPost && newPost.name && newPost.message) {
        const currentPosts = await loadPosts(); // Load current posts
        currentPosts.push(newPost);
        await savePosts(currentPosts); // Save updated posts to the file
        res.status(201).json(newPost);
    } else {
        res.status(400).send('Invalid post data');
    }
});

// PATCH /api/posts/:index - Update a specific post
router.patch('/api/posts/:index', async (req, res) => {
    const index = req.params.index; // Get the index from the request parameters
    const updatedPost = req.body;

    const currentPosts = await loadPosts(); // Load current posts

    if (index >= 0 && index < currentPosts.length && updatedPost && updatedPost.message) {
        currentPosts[index].message = updatedPost.message;

        await savePosts(currentPosts); // Save updated posts
        res.status(200).json(currentPosts[index]);
    } else {
        res.status(400).send('Invalid update data');
    }
});

// POST /api/posts/:index/comments - Add a comment to a specific post
router.post('/api/posts/:index/comments', async (req, res) => {
    const index = req.params.index; // Get index from the request parameters
    const comment = req.body;

    const currentPosts = await loadPosts(); // Load current posts

    if (index >= 0 && index < currentPosts.length && comment && comment.name && comment.message) {
        currentPosts[index].comments.push(comment); // Add comment to the appropriate post
        await savePosts(currentPosts); // Save updated posts
        res.status(201).json(comment); // Send back the created comment
    } else {
        res.status(400).send('Invalid comment data');
    }
});

module.exports = () => router; // Export the function to create a router