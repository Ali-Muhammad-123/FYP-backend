const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostImmigrationCard = require("../controllers/PostImmigrationCard");


Router.post('/immigrationcard', auth, async (req, res) => {

    PostImmigrationCard.Execute(req, res);


});





module.exports = Router;