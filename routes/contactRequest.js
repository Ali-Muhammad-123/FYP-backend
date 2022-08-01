const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostRequest = require("../controllers/PostContactRequest");

Router.post('/contactrequest', async (req, res) => {

    PostRequest.Execute(req, res);


});

module.exports = Router;
