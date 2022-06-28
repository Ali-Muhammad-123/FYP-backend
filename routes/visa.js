const postVisaController = require("../controllers/PostVisaController");
const GetVisaController = require("../controllers/GetVisaController");
const UpdateVisaController = require("../controllers/UpdateVisa");
const DeleteVisaController = require("../controllers/DeleteVisa");
const visaRouter = require("express").Router();
const auth = require("../middleware/adminAuth");

module.exports = (upload) => {
  visaRouter.post(
    "/visa",
    auth,
    upload.fields([
      { name: "entryPermit", maxCount: 1 },
      { name: "passport", maxCount: 1 },
      { name: "residencyVisa", maxCount: 1 },
      { name: "emiratesId", maxCount: 1 },
    ]),
    async (req, res, next) => {
      postVisaController.Execute(req, res, next);
    }
  );

  visaRouter.put(
    "/visa",
    auth,
    upload.array("passport"),
    upload.array("entryPermit"),
    upload.array("residencyVisa"),
    upload.array("emiratesId"),
    async (req, res, next) => {
      UpdateVisaController.Execute(req, res, next);
    }
  );

  visaRouter.get("/visa", auth, async (req, res) => {
    GetVisaController.Execute(req, res);
  });

  visaRouter.delete("/visa", auth, async (req, res) => {
    DeleteVisaController.Execute(req, res);
  });

  return visaRouter;
};
