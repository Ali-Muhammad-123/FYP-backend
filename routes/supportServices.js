const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

const PostRequest = require("../controllers/PostSupportServices");
const GetSupportServiceController = require("../controllers/GetSupportServices");
const UpdateSupportServicesController = require("../controllers/UpdateSupportServices");

Router.post("/supportServices", auth, async (req, res) => {
	PostRequest.Execute(req, res);
});

Router.get("/supportServices", commonauth, async (req, res) => {
	GetSupportServiceController.Execute(req, res);
});

Router.put("/supportServices", auth, async (req, res) => {
	UpdateSupportServicesController.Execute(req, res);
});

module.exports = Router;
