const postVisaController = require("../controllers/PostVisaController");
const visaRouter = require("express").Router();
const auth = require("../middleware/auth");


visaRouter.post("/visa", auth, async (req, res) => {

    postVisaController.Execute(req, res);

});



module.exports = visaRouter;