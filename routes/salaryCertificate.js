const PostSalarycertificateController = require("../controllers/PostSalarycertificate");
const GetSalaryCertificateController = require("../controllers/GetSalaryCertificate");
const UpdateSalaryCertificate = require("../controllers/UpdateSalaryCertificate");
const DeleteSalaryCertificate = require("../controllers/DeleteSalaryCertificate");


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


    Router.put(
        "/salarycertificate",
        auth,
        upload.single("salary-certificate"),
        async (req, res, next) => {

            UpdateSalaryCertificate.Execute(req, res, next);

        });

    Router.get("/salarycertificate", auth, async (req, res) => {
        GetSalaryCertificateController.Execute(req, res);

    });


    Router.delete("/salarycertificate", auth, async (req, res) => {
        DeleteSalaryCertificate.Execute(req, res);
    });


    return Router;

}