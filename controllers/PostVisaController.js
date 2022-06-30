const Visa = require("../models/visa");
const File = require("../models/file");

class PostVisaController {
  static async Execute(req, res) {
    //console.log(req)
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

    console.log(req.body)

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



      var PassportAllFiles = [];

      for (const file of req.files.passport) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        const fileNew = await File.create(final_file);

        PassportAllFiles.push(fileNew._id);
      }


      var entryPermitAllFiles = [];

      for (const file of req.files.entryPermit) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        const fileNew = await File.create(final_file);

        entryPermitAllFiles.push(fileNew._id);
      }


      var residencyVisaAllFiles = [];

      for (const file of req.files.residencyVisa) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        const fileNew = await File.create(final_file);

        residencyVisaAllFiles.push(fileNew._id);
      }


      var emiratesIdAllFiles = [];

      for (const file of req.files.emiratesId) {
        var final_file = {
          file: file.filename,
          contentType: file.mimetype,
        };
        const fileNew = await File.create(final_file);

        emiratesIdAllFiles.push(fileNew._id);
      }



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
          passport: PassportAllFiles,
          entryPermit: entryPermitAllFiles,
          residencyVisa: residencyVisaAllFiles,
          emiratesId: emiratesIdAllFiles
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
