const express = require('express');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    message: String,
    comments: [{ name: String, message: String }]
});

const Post = mongoose.model('Post', postSchema);

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
});

router.patch('/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

router.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
});

// Define and export the getAllPosts function
const getAllPosts = async () => {
    return await Post.find();
};

module.exports = { router, getAllPosts };