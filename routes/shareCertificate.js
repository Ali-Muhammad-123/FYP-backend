const PostShareCertificateController = require("../controllers/PostShareCertificate");


const shareCertificateRouter = require("express").Router();
const auth = require("../middleware/adminAuth");


module.exports = (upload) => {

    shareCertificateRouter.post(
        "/sharecertificate",
        auth,
        upload.single("file"),
        async (req, res, next) => {

            PostShareCertificateController.Execute(req, res, next);

        });



    return shareCertificateRouter;

}