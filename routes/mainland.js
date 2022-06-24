const PostMainlandController = require("../controllers/PostMainland");
const GetMainlandController = require("../controllers/GetMainland");

const mainlandRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

mainlandRouter.post("/mainland", auth, async (req, res) => {

    PostMainlandController.Execute(req, res);
});

mainlandRouter.get("/mainland", auth, async (req, res) => {
    GetMainlandController.Execute(req, res);
});

module.exports = mainlandRouter;
