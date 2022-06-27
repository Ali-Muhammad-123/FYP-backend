const GetUserController = require("../controllers/GetUserController");
const userRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

userRouter.get("/user", auth, async (req, res) => {

  GetUserController.Execute(req, res);

});


module.exports = userRouter;
