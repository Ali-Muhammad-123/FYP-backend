const postVisaController = require("../controllers/PostVisaController");
const GetVisaController = require("../controllers/GetVisaController");
const UpdateVisaController = require("../controllers/UpdateVisa");
const visaRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

module.exports = (upload) => {
    visaRouter.post("/visa",
        auth,
        upload.single("visa"),
        async (req, res, next) => {

            postVisaController.Execute(req, res, next);

        });


    visaRouter.put("/visa",
        auth,
        upload.single("visa"),
        async (req, res, next) => {

            UpdateVisaController.Execute(req, res, next);

        });

    visaRouter.get("/visa", auth, async (req, res) => {
        GetVisaController.Execute(req, res);
    });


    return visaRouter;

}