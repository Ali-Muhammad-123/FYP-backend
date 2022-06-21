const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const officeLeaseAgreementRouter = require("express").Router();

officeLeaseAgreementRouter.get("/officeleaseagreements", async (req, res) => {

  var agreements = await OfficeLeaseAgreement.find();

  if (agreements && agreements.length > 0) {

    res.status(200).json({
      message: "Sucess",
      agreements: agreements
    });

  } else {
    res.status(404).json({
      message: "No Record found",
    });
  }
});

officeLeaseAgreementRouter.post('/officeleaseagreements', async (req, next, res) => {

  const { client_id, clientName, dateOfIssue, expiryDate } = req.body;

  if (client_id != undefined &&
    clientName != undefined &&
    dateOfIssue != undefined &&
    expiryDate != undefined) {

    const officeLeaseAgreement = new OfficeLeaseAgreement({
      Client_id: client_id,
      clientName: clientName,
      dateOfIssue: dateOfIssue,
      expiryDate: expiryDate
    })

    await officeLeaseAgreement.save((err) => {
      if (err) {
        return res.status(400).send(err);
      }
      else {
        res.status(200).json({
          message: `agreement saved`,
        });
      }
    })

  } else {
    res.status(400).json({
      message: `Invalid Request`,
    });
  }


})

module.exports = officeLeaseAgreementRouter;
