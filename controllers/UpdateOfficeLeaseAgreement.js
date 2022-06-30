const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateOfficeLeaseAgreementController {
  static async Execute(req, res) {
    const { company, dateOfIssue, expiryDate } = req.body;
    const { _id } = req.query;

    if (
      company != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      _id != undefined
    ) {


      if (req.file != undefined) {

        var oldOfficeLeaseAgreement = await OfficeLeaseAgreement.findOne({ _id: _id });
        if (oldOfficeLeaseAgreement) {
          deleteFile.Execute(oldOfficeLeaseAgreement.file)
        }

        var final_file = {
          file: req.file.filename,
          contentType: req.file.mimetype,
        };
        File.create(final_file, function (err, result) {
          if (err) {
            res.status(400).json({
              message: `Error: ${err}`,
            });
          } else {
            OfficeLeaseAgreement.findOneAndUpdate(
              { _id: _id },
              {
                $set: {
                  company: company,
                  dateOfIssue: dateOfIssue,
                  expiryDate: expiryDate,
                  file: result._id,
                },
              },
              { upsert: true },
              (err, response) => {
                if (err) {
                  res.status(400).json({
                    message: `Error: ${err}`,
                  });
                } else {
                  res.status(200).json({
                    message: `Office Lease Agreement updated with file.`,
                  });
                }
              }
            );
          }
        });
      } else {
        OfficeLeaseAgreement.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              company: company,
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              res.status(400).json({
                message: `Error: ${err}`,
              });
            } else {
              res.status(200).json({
                message: `Office Lease Agreement updated without file.`,
              });
            }
          }
        );
      }
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = UpdateOfficeLeaseAgreementController;
