const PostActivityController = require("../controllers/PostActivity");
const GetActivityController = require("../controllers/GetActivity");
const UpdateActivityController = require("../controllers/UpdateActivity");
const DeleteActivityController = require("../controllers/DeleteActivity");

const activityRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

activityRouter.post("/activity", auth, async (req, res) => {
	PostActivityController.Execute(req, res);
});

activityRouter.put("/activity", auth, async (req, res) => {
	UpdateActivityController.Execute(req, res);
});

activityRouter.get("/activity", auth, async (req, res) => {
	GetActivityController.Execute(req, res);
});

activityRouter.delete("/activity", auth, async (req, res) => {
	DeleteActivityController.Execute(req, res);
});

module.exports = activityRouter;
