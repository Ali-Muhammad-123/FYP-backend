const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {
  static async Execute(req, res) {
    const {
      user,
      companyName,
      visaApplicant,
      visaUID,
      visaType,
      jobTitle,
      dateOfIssue,
      expiryDate,
    } = req.body;

    if (
      user != undefined &&
      companyName != undefined &&
      visaApplicant != undefined &&
      visaUID != undefined &&
      visaType != undefined &&
      jobTitle != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      req.file != undefined
    ) {
      var allFiles = [];

      req.files.forEach((file) => {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        File.create(final_file, function (err, result) {
          if (err) {
            res.status(400).json({
              message: `Error: ${err}`,
            });
          } else {
            allFiles.push(result._id);
          }
        });
      });

      Visa.create(
        {
          user: user,
          companyName: companyName,
          visaApplicant: visaApplicant,
          visaUID: visaUID,
          visaType: visaType,
          jobTitle: jobTitle,
          dateOfIssue: dateOfIssue,
          expiryDate: expiryDate,
          file: allFiles,
        },
        (err, response) => {
          if (err) {
            res.status(400).json({
              message: `Error: ${err}`,
            });
          } else {
            res.status(200).json({
              message: `Visa Saved.`,
            });
          }
        }
      );
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = PostVisaController;
