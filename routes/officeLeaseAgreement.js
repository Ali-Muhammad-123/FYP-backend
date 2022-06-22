const PostOfficeLeaseAgreementController = require("../controllers/PostOfficeLeaseAgreement");
const GetOfficeLeaseAgreementController = require("../controllers/GetOfficeLeaseAgreement");
const officeLeaseAgreementRouter = require("express").Router();
const auth = require("../middleware/auth");

officeLeaseAgreementRouter.get("/officeleaseagreements", auth, async (req, res) => {

  GetOfficeLeaseAgreementController.Execute(req, res);
});

officeLeaseAgreementRouter.post('/officeleaseagreements', auth, async (req, res) => {

  PostOfficeLeaseAgreementController.Execute(req, res);


})

module.exports = officeLeaseAgreementRouter;
