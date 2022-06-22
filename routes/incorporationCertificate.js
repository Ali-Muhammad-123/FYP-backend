const Router = require("express").Router();
const auth = require("../middleware/auth");
const PostIncorporationCertificate = require("../controllers/PostIncorporationCertificate");


Router.post('/incorporationCertificate', auth, async (req, res) => {

    PostIncorporationCertificate.Execute(req, res);


});





module.exports = Router;