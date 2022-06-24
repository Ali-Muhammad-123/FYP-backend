const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostFeedbackReply = require("../controllers/PostFeedbackReply");
const GetFeedbackReply = require("../controllers/GetFeedbackReply");

Router.post("/feedbackreply", auth, async (req, res) => {
  PostFeedbackReply.Execute(req, res);
});


Router.get("/feedbackreply", auth, async (req, res) => {
  GetFeedbackReply.Execute(req, res);
});


module.exports = Router;
