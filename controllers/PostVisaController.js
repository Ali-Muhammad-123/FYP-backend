const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {
  static async Execute(req, res) {
    const {
      user,
      visaApplicant,
      visaUID,
      visaType,
      jobTitle,
      dateOfIssue,
      expiryDate,
    } = req.body;

    if (
      user != undefined &&
      visaApplicant != undefined &&
      visaUID != undefined &&
      visaType != undefined &&
      jobTitle != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      req.files != undefined
    ) {
      var allFiles = [];
      //   console.log(req.files);

      for (const file of req.files) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        const fileNew = await File.create(final_file);

        allFiles.push(fileNew._id);
      }

      console.log(allFiles);
      Visa.create(
        {
          user: user,
          visaApplicant: visaApplicant,
          visaUID: visaUID,
          visaType: visaType,
          jobTitle: jobTitle,
          dateOfIssue: dateOfIssue,
          expiryDate: expiryDate,
          visa: allFiles,
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
