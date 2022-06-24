const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostImmigrationCard = require("../controllers/PostImmigrationCard");
const GetImmigrationCard = require("../controllers/GetImmigrationCard");

module.exports = (upload) => {


    Router.post(
        '/immigrationcard',
        auth,
        upload.single("immigration-card"),
        async (req, res, next) => {

            PostImmigrationCard.Execute(req, res, next);

        });

    Router.get("/immigrationcard", auth, async (req, res) => {
        GetImmigrationCard.Execute(req, res);
    });


    return Router;

}   