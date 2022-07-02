const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateOfficeLeaseAgreementController {
  static async Execute(req, res) {
    const { company, dateOfIssue, expiryDate } = req.body;
    const { id } = req.query;

    if (
      company != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      id != undefined &&
      id.match(/^[0-9a-fA-F]{24}$/)
    ) {


      if (req.file != undefined) {

        var oldOfficeLeaseAgreement = await OfficeLeaseAgreement.findOne({ _id: id });
        if (oldOfficeLeaseAgreement && oldOfficeLeaseAgreement.file) {
          deleteFile.Execute(oldOfficeLeaseAgreement.file, req.route.path)
        }

        var final_file = {
          file: req.file.filename,
          contentType: req.file.mimetype,
          docOF: req.route.path,
        };
        File.create(final_file, function (err, result) {
          if (err) {
            res.status(400).json({
              message: `Error: ${err}`,
            });
          } else {
            OfficeLeaseAgreement.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  company: company.trim(),
                  dateOfIssue: dateOfIssue.trim(),
                  expiryDate: expiryDate.trim(),
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
          { _id: id },
          {
            $set: {
              company: company.trim(),
              dateOfIssue: dateOfIssue.trim(),
              expiryDate: expiryDate.trim(),
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
