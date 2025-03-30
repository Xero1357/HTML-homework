const express = require('express');
const path = require('path');
const postsRouter = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // Serve static files
app.use(express.json());
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// In-memory store for posts
let posts = [];

// Route to render the index.ejs page and pass in posts
app.get('/', (req, res) => {
    res.render('index', { posts }); // Pass posts to the EJS template
});

// Use the posts API router to handle creating new posts
app.use(postsRouter(posts)); // Pass posts array to router

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});