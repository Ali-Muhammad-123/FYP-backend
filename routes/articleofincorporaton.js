const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostArticleOfIncorporation = require("../controllers/PostArticleOfIncorporation");
const GetArticleOfIncorporation = require("../controllers/GetArticleOfnIncorporation");
const PutArticleOfIncorporation = require("../controllers/UpdateArticleOfIncorporation");
const DeleteArticleOfIncorporation = require("../controllers/DeleteArticleOfIncorporation");

module.exports = (upload) => {

  Router.post(
    '/articleofincorporation',
    auth,
    upload.single("article-of-incorporation"),
    async (req, res, next) => {

      PostArticleOfIncorporation.Execute(req, res, next);


    });

  Router.put(
    '/articleofincorporation',
    auth,
    upload.single("article-of-incorporation"),
    async (req, res, next) => {

      PutArticleOfIncorporation.Execute(req, res, next);


    });


  Router.get("/articleofincorporation", auth, async (req, res) => {

    GetArticleOfIncorporation.Execute(req, res);

  });

  Router.delete("/articleofincorporation", auth, async (req, res) => {

    DeleteArticleOfIncorporation.Execute(req, res);

  });

  return Router;
}