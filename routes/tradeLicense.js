const posttradeLicenseController = require("../controllers/PostTradeLicenseController");
const gettradeLicenseController = require("../controllers/GetTradeLicenseController");
const updatetradeLicenseController = require("../controllers/UpdateTradeLicense");
const DeleteTradeLicenseController = require("../controllers/DeleteTradeLicense");
const auth = require("../middleware/adminAuth");
const tradeLicenseRouter = require("express").Router();
const { body, check, validationResult } = require("express-validator");

module.exports = (upload) => {
  tradeLicenseRouter.post(
    "/tradelicense",
    auth,
    upload.single("trade-license"),
    async (req, res, next) => {
      posttradeLicenseController.Execute(req, res, next);
    }
  );


  tradeLicenseRouter.put(
    "/tradelicense",
    auth,
    upload.single("tradelicense"),
    async (req, res, next) => {
      updatetradeLicenseController.Execute(req, res, next);
    }
  );


  tradeLicenseRouter.get("/tradelicense", auth,
    async (req, res) => {
      gettradeLicenseController.Execute(req, res);
    });

  tradeLicenseRouter.delete("/tradelicense",
    auth, async (req, res) => {
      DeleteTradeLicenseController.Execute(req, res);
    });

  return tradeLicenseRouter;
};
