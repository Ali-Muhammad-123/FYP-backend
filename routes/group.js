const PostGroup = require("../controllers/PostGroup");
const GetGroup = require("../controllers/GetGroup");
const SearchGroup = require("../controllers/SearchGroup");
const UpdateCalculator = require("../controllers/UpdateCalculator");
const DeleteCalculator = require("../controllers/DeleteCalculator");
const groupRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");
const GetGroupsController = require("../controllers/UpdateCalculator");

groupRouter.post("/group", async (req, res) => {
	PostGroup.Execute(req, res);
});

groupRouter.get("/group/search", async (req, res) => {
	SearchGroup.Execute(req, res);
});

groupRouter.put("/group", async (req, res) => {
	UpdateCalculator.Execute(req, res);
});

groupRouter.put("/getGroups/:panel", async (req, res) => {
	GetGroupsController.Execute(req, res);
});

groupRouter.get("/group", async (req, res) => {
	GetGroup.Execute(req, res);
});

groupRouter.delete("/group", async (req, res) => {
	DeleteCalculator.Execute(req, res);
});

module.exports = groupRouter;
