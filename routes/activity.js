const PostPanelController = require("../controllers/PostPanel");
const GetPanelController = require("../controllers/GetPanel");
// const UpdatePanelController = require("../controllers/UpdatePanel");
// const DeletePanelController = require("../controllers/DeletePanel");

const panelRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

panelRouter.post("/panel", async (req, res) => {
	PostPanelController.Execute(req, res);
});

panelRouter.put("/panel", async (req, res) => {
	UpdatePanelController.Execute(req, res);
});

panelRouter.get("/panel", async (req, res) => {
	GetPanelController.Execute(req, res);
});

panelRouter.delete("/panel", async (req, res) => {
	DeletePanelController.Execute(req, res);
});

module.exports = panelRouter;
