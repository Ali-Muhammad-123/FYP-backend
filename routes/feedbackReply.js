const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostFeedbackReply = require("../controllers/PostFeedbackReply");

Router.post("/feedbackreply", auth, async (req, res) => {
  PostFeedbackReply.Execute(req, res);
});

module.exports = Router;
