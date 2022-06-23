const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostArticleOfIncorporation = require("../controllers/PostArticleOfIncorporation");
const GetArticleOfIncorporation = require("../controllers/GetArticleOfnIncorporation");

Router.post('/articleofincorporation', auth, async (req, res) => {

  PostArticleOfIncorporation.Execute(req, res);


});


Router.get("/articlesofincorporation", auth, async (req, res) => {

  GetArticleOfIncorporation.Execute(req, res);

});

module.exports = Router;
