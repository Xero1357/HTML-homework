const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    message: String,
});

const postSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;