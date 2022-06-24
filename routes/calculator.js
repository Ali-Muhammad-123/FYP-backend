const PostCalculator = require("../controllers/PostCalculator");
const GetCalculator = require("../controllers/GetCalculator");
const calculatorRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

calculatorRouter.post("/calculator", auth, async (req, res) => {

    PostCalculator.Execute(req, res);

});

calculatorRouter.get("/calculator", auth, async (req, res) => {
    GetCalculator.Execute(req, res);
});


module.exports = calculatorRouter;
