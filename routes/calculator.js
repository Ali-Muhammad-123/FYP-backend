const PostCalculator = require("../controllers/PostCalculator");
const GetCalculator = require("../controllers/GetCalculator");
const UpdateCalculator = require("../controllers/UpdateCalculator");
const DeleteCalculator = require("../controllers/DeleteCalculator");
const calculatorRouter = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonAuth");

calculatorRouter.post("/calculator", auth, async (req, res) => {

    PostCalculator.Execute(req, res);

});

calculatorRouter.put("/calculator", auth, async (req, res) => {

    UpdateCalculator.Execute(req, res);

});

calculatorRouter.get("/calculator", commonauth, async (req, res) => {
    GetCalculator.Execute(req, res);
});

calculatorRouter.delete("/calculator", auth, async (req, res) => {
    DeleteCalculator.Execute(req, res);
});

module.exports = calculatorRouter;
