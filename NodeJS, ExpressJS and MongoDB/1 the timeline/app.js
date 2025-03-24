const express = require('express');
const path = require('path');
const postsRouter = require('./router'); // This is where your router code will reside.

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(postsRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});