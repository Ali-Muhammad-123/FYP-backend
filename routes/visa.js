const postVisaController = require("../controllers/PostVisaController");
const visaRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

module.exports = (upload) => {
    visaRouter.post("/visa",
        auth,
        upload.single("file"),
        async (req, res, next) => {

            postVisaController.Execute(req, res, next);

        });



    return visaRouter;

}