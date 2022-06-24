const filesRouter = require("express").Router();
const GetFile = require("../controllers/GetFile");
const auth = require("../middleware/clientAuth");

filesRouter.get("/files/:id", auth, async (req, res) => {
  GetFile.Execute(req, res);
});

module.exports = filesRouter;
