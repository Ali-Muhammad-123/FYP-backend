const userRouter = require("express").Router();
const GetUserController = require("../controllers/GetUserController");
const auth = require("../middleware/adminAuth");

userRouter.get("/user", auth, async (req, res) => {
  GetUserController.Execute(req, res);
});

module.exports = userRouter;
