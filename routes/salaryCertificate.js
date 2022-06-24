const PostSalarycertificateController = require("../controllers/PostSalarycertificate");


const Router = require("express").Router();
const auth = require("../middleware/adminAuth");

module.exports = (upload) => {
    Router.post(
        "/salarycertificate",
        auth,
        upload.single("salary-certificate"),
        async (req, res, next) => {

            PostSalarycertificateController.Execute(req, res, next);

        });



    return Router;

}