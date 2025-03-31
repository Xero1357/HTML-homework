const express = require('express');
const path = require('path');
const postsRouter = require('./router'); // Adjust this according to your file structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json());
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Load initial posts from data.json
const fs = require('fs').promises; 
const dataFilePath = path.join(__dirname, 'data.json');

async function loadPosts() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read data file:", error);
        return []; // Return empty array if the file doesn't exist or has bad content
    }
}

// Route to render the index.ejs page and pass in posts
app.get('/', async (req, res) => {
    const posts = await loadPosts(); // Load posts from file
    res.render('index', { posts });   // Pass posts to the EJS template
});

// Use the posts API router to handle creating new posts
app.use(postsRouter()); // Pass router without initialPosts

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});