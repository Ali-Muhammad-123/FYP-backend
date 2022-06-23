const Router = require("express").Router();
const auth = require("../middleware/clientAuth");
const PostFeedback = require("../controllers/PostFeedback");


Router.post('/feedback', auth, async (req, res) => {

    PostFeedback.Execute(req, res);

});





module.exports = Router;