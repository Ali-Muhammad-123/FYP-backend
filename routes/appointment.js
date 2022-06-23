const Router = require("express").Router();
const auth = require("../middleware/commonauth");
const PostAppointment = require("../controllers/PostAppointment");

Router.post('/appointment', auth, async (req, res) => {

    PostAppointment.Execute(req, res);


});


module.exports = Router;
