const PostShareCertificateController = require("../controllers/PostShareCertificate");


const shareCertificateRouter = require("express").Router();
const auth = require("../middleware/auth");


shareCertificateRouter.post("/sharecertificate", auth, async (req, res) => {

    PostShareCertificateController.Execute(req, res);

});



module.exports = shareCertificateRouter;