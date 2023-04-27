const PostPanelController = require("../controllers/PostPanel");
const GetPanelController = require("../controllers/GetPanel");
const AssignGroupController = require("../controllers/AssignGroup");
const DeleteMainlandController = require("../controllers/DeleteMainland");
const panelRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

panelRouter.post("/panel", async (req, res) => {
	PostPanelController.Execute(req, res);
});

panelRouter.get("/panel", async (req, res) => {
	GetPanelController.Execute(req, res);
});

panelRouter.put("/panel/assign", async (req, res) => {
	AssignGroupController.Execute(req, res);
});

panelRouter.delete("/mainland", async (req, res) => {
	DeleteMainlandController.Execute(req, res);
});

module.exports = panelRouter;
