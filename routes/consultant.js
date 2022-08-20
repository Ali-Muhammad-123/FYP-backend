const Router = require("express").Router();
const auth = require("../middleware/adminAuth");

const PostConsultant = require("../controllers/PostConsultant");
const GetConsultant = require("../controllers/GetConsultant");
const UpdateConsultant = require("../controllers/UpdateConsultant");
const DeleteConsultant = require("../controllers/DeleteConsultant");

module.exports = (upload) => {


    Router.post(
        '/consultant',
        auth,
        upload.single("picture"),
        async (req, res, next) => {
            PostConsultant.Execute(req, res, next);
        });


    Router.put(
        '/consultant',
        auth,
        upload.single("picture"),
        async (req, res, next) => {

            UpdateConsultant.Execute(req, res, next);

        });

    Router.get("/consultant", auth, async (req, res) => {
        GetConsultant.Execute(req, res);
    });

    Router.delete("/consultant", auth, async (req, res) => {
        DeleteConsultant.Execute(req, res);
    });

    return Router;

}   