const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostArticleOfIncorporation = require("../controllers/PostArticleOfIncorporation");
const GetArticleOfIncorporation = require("../controllers/GetArticleOfnIncorporation");

module.exports = (upload) => {

  Router.post(
    '/articleofincorporation',
    auth,
    upload.single("article-of-incorporation"),
    async (req, res, next) => {

      PostArticleOfIncorporation.Execute(req, res, next);


    });


  Router.get("/articlesofincorporation", auth, async (req, res) => {

    GetArticleOfIncorporation.Execute(req, res);

  });

  return Router;
}