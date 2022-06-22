const Router = require("express").Router();
const auth = require("../middleware/auth");
const PostFeedback = require("../controllers/PostFeedback");


Router.post('/Feedback', auth, async (req, res) => {

    PostFeedback.Execute(req, res);

});





module.exports = Router;