const PostOfficeLeaseAgreementController = require("../controllers/PostOfficeLeaseAgreement");
const GetOfficeLeaseAgreementController = require("../controllers/GetOfficeLeaseAgreement");
const officeLeaseAgreementRouter = require("express").Router();
const auth = require("../middleware/adminAuth");


module.exports = (upload) => {

  officeLeaseAgreementRouter.get("/officeleaseagreements", auth, async (req, res) => {

    GetOfficeLeaseAgreementController.Execute(req, res);
  });

  officeLeaseAgreementRouter.post(
    '/officeleaseagreements',
    auth,
    upload.single("office-lease-agreement"),
    async (req, res, next) => {
      PostOfficeLeaseAgreementController.Execute(req, res, next);
    });

  return officeLeaseAgreementRouter;
}