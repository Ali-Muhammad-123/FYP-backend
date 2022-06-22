const GetClientController = require("../controllers/GetClientController");
const clientRouter = require("express").Router();
const auth = require("../middleware/auth");

clientRouter.get("/client", auth, async (req, res) => {

  GetClientController.Execute(req, res);

});


module.exports = clientRouter;
