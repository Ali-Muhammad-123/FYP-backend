const PostSalarycertificateController = require("../controllers/PostSalarycertificate");


const Router = require("express").Router();
const auth = require("../middleware/adminAuth");


Router.post("/salarycertificate", auth, async (req, res) => {

    PostSalarycertificateController.Execute(req, res);

});



module.exports = Router;