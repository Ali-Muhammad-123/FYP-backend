const PostEmirates = require("../controllers/PostEmirates");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");

Router.post("/emirates", auth, async (req, res) => {

    PostEmirates.Execute(req, res);

});


module.exports = Router;
