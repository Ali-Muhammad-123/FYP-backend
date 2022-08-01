const filesRouter = require("express").Router();
const GetFile = require("../controllers/GetFile");
const DeleteFile = require("../controllers/DeleteFile");
const auth = require("../middleware/clientAuth");

filesRouter.get("/files/:id/:client", auth, async (req, res) => {
  GetFile.Execute(req, res);
});

filesRouter.delete("/files/:id", auth, async (req, res) => {
  DeleteFile.Execute(req, res);
});

module.exports = filesRouter;
