const express = require('express');
const router = express.Router();
const Article = require('../models/articles');

router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.render('index', { articles });
});

router.get('/new', (req, res) => {
    res.render('new-article-page');
});

router.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('details', { article });
});

module.exports = router;
