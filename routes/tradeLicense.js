const posttradeLicenseController = require("../controllers/PostTradeLicenseController");
const gettradeLicenseController = require("../controllers/GetTradeLicenseController");
const auth = require("../middleware/adminAuth");
const tradeLicenseRouter = require("express").Router();
const { body, validationResult } = require("express-validator");

module.exports = (upload) => {
  tradeLicenseRouter.post(
    "/uploadtradelicense",
    auth,
    upload.single("trade-license"),
    async (req, res, next) => {
      posttradeLicenseController.Execute(req, res, next);
    }
  );

  tradeLicenseRouter.get("/gettradelicense", auth, async (req, res) => {
    gettradeLicenseController.Execute(req, res);
  });

  return tradeLicenseRouter;
};
