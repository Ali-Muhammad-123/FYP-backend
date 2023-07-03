const PostGroup = require("../controllers/PostGroup");
const GetGroup = require("../controllers/GetGroup");
const SearchGroup = require("../controllers/SearchGroup");
const AssignGrade = require("../controllers/AssignGrade");
const GetGrades = require("../controllers/GetGrades");
const groupRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

groupRouter.post("/group", async (req, res) => {
	PostGroup.Execute(req, res);
});

groupRouter.get("/group/search", async (req, res) => {
	SearchGroup.Execute(req, res);
});

groupRouter.put("/group", async (req, res) => {
	// UpdateCalculator.Execute(req, res);
});

groupRouter.get("/group", async (req, res) => {
	GetGroup.Execute(req, res);
});

groupRouter.delete("/group", async (req, res) => {
	// DeleteCalculator.Execute(req, res);
});

groupRouter.post("/assignGrade", async (req, res) => {
	AssignGrade.Execute(req, res);
});

groupRouter.get("/getGrades", async (req, res) => {
	GetGrades.Execute(req, res);
});

module.exports = groupRouter;
