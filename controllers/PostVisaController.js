const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {
  static async Execute(req, res) {
    console.log(req)
    const {
      company,
      firstName,
      lastName,
      passportNo,
      passportIssue,
      passportExpiry,
      passportCountry,
      passport,
      entryPermitIssued,
      entryPermit,
      visaUID,
      residencyVisaIssued,
      residencyVisa,
      emiratesIdIssued,
      emiratesId
    } = req.body;

    if (
      company != undefined &&
      firstName != undefined &&
      lastName != undefined &&
      passportNo != undefined &&
      passportIssue != undefined &&
      passportExpiry != undefined &&
      passportCountry != undefined &&
      entryPermitIssued != undefined &&
      residencyVisaIssued != undefined &&
      emiratesIdIssued != undefined &&
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
          company: company,
          firstName: firstName,
          lastName: lastName,
          passportNo: passportNo,
          passportIssue: passportIssue,
          passportExpiry: passportExpiry,
          passportCountry: passportCountry,
          entryPermitIssued: entryPermitIssued,
          residencyVisaIssued: residencyVisaIssued,
          emiratesIdIssued: emiratesIdIssued,
          passport: allFiles,
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
