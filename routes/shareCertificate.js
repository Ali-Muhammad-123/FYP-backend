const PostShareCertificateController = require("../controllers/PostShareCertificate");
const GetShareCertificateController = require("../controllers/GetShareCertificate");
const UpdateShareCertificateController = require("../controllers/UpdateShareCertificate");


const shareCertificateRouter = require("express").Router();
const auth = require("../middleware/adminAuth");


module.exports = (upload) => {

    shareCertificateRouter.post(
        "/sharecertificate",
        auth,
        upload.single("share-certificate"),
        async (req, res, next) => {

            PostShareCertificateController.Execute(req, res, next);

        });

    shareCertificateRouter.put(
        "/sharecertificate",
        auth,
        upload.single("share-certificate"),
        async (req, res, next) => {

            UpdateShareCertificateController.Execute(req, res, next);

        });


    shareCertificateRouter.get("/sharecertificate", auth, async (req, res) => {
        GetShareCertificateController.Execute(req, res);
    });


    return shareCertificateRouter;

}