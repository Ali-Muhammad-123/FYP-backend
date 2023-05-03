const Router = require("express").Router();
const GetActiveExamsController = require("../controllers/GetActiveExams");
const PostactiveExamsController = require("../controllers/PostactiveExamsController");

Router.post("/activeExam", async (req, res) => {
	PostactiveExamsController.Execute(req, res);
});

Router.get("/activeExam", async (req, res) => {
	GetActiveExamsController.Execute(req, res);
});

module.exports = Router;
