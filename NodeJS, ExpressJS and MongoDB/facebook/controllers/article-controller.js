const Article = require("../models/articles");

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ date: -1 });
        res.render("index", { articles });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render("details", { article });
    } catch (err) {
        res.status(500).send("Article not found");
    }
};

exports.createArticle = async (req, res) => {
    const { title, message } = req.body;
    try {
        await Article.create({ title, message });
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error creating article");
    }
};

exports.updateArticle = async (req, res) => {
    const { title, message } = req.body;
    try {
        await Article.findByIdAndUpdate(req.params.id, { title, message });
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error updating article");
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error deleting article");
    }
};
