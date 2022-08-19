const PostMainlandController = require("../controllers/PostMainland");
const GetMainlandController = require("../controllers/GetMainland");
const UpdateMainlandController = require("../controllers/UpdateMainland");
const DeleteMainlandController = require("../controllers/DeleteMainland");
const mainlandRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

mainlandRouter.post("/mainland", async (req, res) => {

    PostMainlandController.Execute(req, res);
});

mainlandRouter.get("/mainland", async (req, res) => {
    GetMainlandController.Execute(req, res);
});

mainlandRouter.put("/mainland", async (req, res) => {
    UpdateMainlandController.Execute(req, res);
});


mainlandRouter.delete("/mainland", async (req, res) => {
    DeleteMainlandController.Execute(req, res);
});

module.exports = mainlandRouter;
