const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const PostImmigrationCard = require("../controllers/PostImmigrationCard");

module.exports = (upload) => {


    Router.post(
        '/immigrationcard',
        auth,
        upload.single("immigration-card"),
        async (req, res, next) => {

            PostImmigrationCard.Execute(req, res, next);

        });

    return Router;

}   