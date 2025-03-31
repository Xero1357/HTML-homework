const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { router: postsRouter, getAllPosts } = require('./router');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://EmirTest:stepstep2@cluster0.kg05f.mongodb.net/your_db_name?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.render('index', { posts });
});

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});