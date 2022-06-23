const PostMainlandController = require("../controllers/PostMainland");
const mainlandRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

mainlandRouter.post("/mainland", auth, async (req, res) => {

    PostMainlandController.Execute(req, res);
});


module.exports = mainlandRouter;
