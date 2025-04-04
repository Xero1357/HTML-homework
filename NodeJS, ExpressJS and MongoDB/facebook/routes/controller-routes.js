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

router.get('/article/edit/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render('edit-article-page', { article });
    } catch (err) {
        res.status(500).send("Error loading the article for editing");
    }
});

router.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('details', { article });
});

router.post("/article", async (req, res) => {
    const { title, message } = req.body;
    try {
        await Article.create({ title, message });
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error creating article");
    }
});


router.post("/article/edit/:id", async (req, res) => {
    const { title, message } = req.body;
    try {
        await Article.findByIdAndUpdate(req.params.id, { title, message });
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error updating article");
    }
});

router.post("/article/delete/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error deleting article");
    }
});

module.exports = router;
