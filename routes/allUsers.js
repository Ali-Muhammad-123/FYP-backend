const allUserRouter = require("express").Router();
const GetUserController = require("../controllers/GetAllUserController");
const auth = require("../middleware/adminAuth");

allUserRouter.get("/alluser:_id", async (req, res) => {
    GetUserController.Execute(req, res);
});


module.exports = allUserRouter;
