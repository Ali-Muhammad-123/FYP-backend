const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostImmigrationCard = require("../controllers/PostImmigrationCard");
const GetImmigrationCard = require("../controllers/GetImmigrationCard");
const UpdateImmigrationCard = require("../controllers/UpdateImmigrationCard");

module.exports = (upload) => {


    Router.post(
        '/immigrationcard',
        auth,
        upload.single("immigration-card"),
        async (req, res, next) => {

            PostImmigrationCard.Execute(req, res, next);

        });


    Router.put(
        '/immigrationcard',
        auth,
        upload.single("immigration-card"),
        async (req, res, next) => {

            UpdateImmigrationCard.Execute(req, res, next);

        });

    Router.get("/immigrationcard", auth, async (req, res) => {
        GetImmigrationCard.Execute(req, res);
    });


    return Router;

}   