const otpRouter = require("express").Router();
const VerifyOTP = require("../controllers/VerifyOTP");

otpRouter.post("/verify", async (req, res) => {
  VerifyOTP.Execute(req, res);
});

module.exports = otpRouter;
