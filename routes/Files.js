const filesRouter = require("express").Router();
const GetFile = require("../controllers/GetFile");
const auth = require("../middleware/commonauth");

filesRouter.get("/files/:id", async (req, res) => {
  GetFile.Execute(req, res);
});

module.exports = filesRouter;