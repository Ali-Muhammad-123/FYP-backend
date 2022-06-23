const GetUserController = require("../controllers/GetuserController");
const userRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

userRouter.get("/user", auth, async (req, res) => {

  GetUserController.Execute(req, res);

});


module.exports = userRouter;
