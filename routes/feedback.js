const Router = require("express").Router();
const ClientAuth = require("../middleware/clientAuth");
const AdminAuth = require("../middleware/adminAuth");
const PostFeedback = require("../controllers/PostFeedback");
const GetFeedback = require("../controllers/GetFeedback");


Router.post('/feedback', ClientAuth, async (req, res) => {

    PostFeedback.Execute(req, res);

});


Router.get("/feedback", AdminAuth, async (req, res) => {
    GetFeedback.Execute(req, res);
});




module.exports = Router;