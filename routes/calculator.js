const PostCalculator = require("../controllers/PostCalculator");
const calculatorRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

calculatorRouter.post("/calculator", auth, async (req, res) => {

    PostCalculator.Execute(req, res);

});


module.exports = calculatorRouter;
