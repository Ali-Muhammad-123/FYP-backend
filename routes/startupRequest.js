const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostRequest = require("../controllers/PostStartupRequest");
const GetRequest = require("../controllers/GetRequest");
const UpdateRequest = require("../controllers/UpdateRequest");

Router.post('/startuprequest', auth, async (req, res) => {

    PostRequest.Execute(req, res);


});


Router.get("/startuprequest", auth, async (req, res) => {
    GetRequest.Execute(req, res);
});


Router.put("/startuprequest", auth, async (req, res) => {
    UpdateRequest.Execute(req, res);
});





module.exports = Router;
