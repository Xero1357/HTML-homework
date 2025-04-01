const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

const createPost = async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
};

const addComment = async (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
};

module.exports = { getAllPosts, createPost, updatePost, addComment };