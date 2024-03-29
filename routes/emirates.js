const PostEmirates = require("../controllers/PostEmirates");
const GetEmirates = require("../controllers/GetEmirates");
const UpdateEmirates = require("../controllers/UpdateEmirates");
const DeleteEmirates = require("../controllers/DeleteEmirates");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

Router.post("/emirates", async (req, res) => {
	PostEmirates.Execute(req, res);
});

Router.put("/emirates", auth, async (req, res) => {
	UpdateEmirates.Execute(req, res);
});

Router.get("/emirates", commonauth, async (req, res) => {
	GetEmirates.Execute(req, res);
});

Router.delete("/emirates", commonauth, async (req, res) => {
	DeleteEmirates.Execute(req, res);
});

module.exports = Router;
