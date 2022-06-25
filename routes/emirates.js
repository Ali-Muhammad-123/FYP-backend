const PostEmirates = require("../controllers/PostEmirates");
const GetEmirates = require("../controllers/GetEmirates");
const UpdateEmirates = require("../controllers/UpdateEmirates");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");

Router.post("/emirates", auth, async (req, res) => {

    PostEmirates.Execute(req, res);

});


Router.put("/emirates", auth, async (req, res) => {

    UpdateEmirates.Execute(req, res);

});

Router.get("/emirates", auth, async (req, res) => {
    GetEmirates.Execute(req, res);
});


module.exports = Router;
