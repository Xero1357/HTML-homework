const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const postsRouter = require('./routes/posts');
const Post = require('./models/Post'); // Add this line to import the Post model

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render the index.ejs page
app.get('/', async (req, res) => {
    const posts = await Post.find(); // Now Post is defined
    res.render('index', { posts });
});

// Use the posts API router
app.use('/api/posts', postsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});