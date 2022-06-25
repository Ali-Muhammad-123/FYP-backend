const Router = require("express").Router();
const auth = require("../middleware/commonauth");
const PostAppointment = require("../controllers/PostAppointment");
const GetAppointment = require("../controllers/GetAppointment");
const UpdateAppointment = require("../controllers/UpdateAppointment");


module.exports = (upload) => {


    Router.post(
        '/appointment',
        auth,
        upload.single("appointment"),
        async (req, res, next) => {

            PostAppointment.Execute(req, res, next);

        });

    Router.put(
        '/appointment',
        auth,
        upload.single("appointment"),
        async (req, res, next) => {

            UpdateAppointment.Execute(req, res, next);

        });


    Router.get("/appointment", auth, async (req, res) => {

        GetAppointment.Execute(req, res);

    });


    return Router;
}