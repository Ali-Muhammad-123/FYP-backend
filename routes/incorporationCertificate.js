const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostIncorporationCertificate = require("../controllers/PostIncorporationCertificate");
const GetIncorporationCertificate = require("../controllers/GetIncorporationCertificate");
const UpdateIncorporationCertificate = require("../controllers/UpdateIncorporationCertificate");

module.exports = (upload) => {

    Router.post(
        '/incorporationCertificate',
        auth,
        upload.single("incorporation-certificate"),
        async (req, res, next) => {

            PostIncorporationCertificate.Execute(req, res, next);


        });


    Router.put(
        '/incorporationCertificate',
        auth,
        upload.single("incorporation-certificate"),
        async (req, res, next) => {

            UpdateIncorporationCertificate.Execute(req, res, next);


        });

    Router.get("/incorporationCertificate", auth, async (req, res) => {
        GetIncorporationCertificate.Execute(req, res);
    });

    return Router;

}