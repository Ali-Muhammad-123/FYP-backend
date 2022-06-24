const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostIncorporationCertificate = require("../controllers/PostIncorporationCertificate");

module.exports = (upload) => {

    Router.post(
        '/incorporationCertificate',
        auth,
        upload.single("incorporation-certificate"),
        async (req, res, next) => {

            PostIncorporationCertificate.Execute(req, res, next);


        });

    return Router;

}