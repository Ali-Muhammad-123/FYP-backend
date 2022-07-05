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
      emiratesId,
      employee,
      familyMember,
    } = req.body;

    console.log(req.body);

    if (
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
          docOF: req.route.path,
        };
        const fileNew = await File.create(final_file);

        PassportAllFiles.push(fileNew._id);
      }

      if (req.files.entryPermit) {
        var entryPermitAllFiles = [];
        for (const file of req.files.entryPermit) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);

          entryPermitAllFiles.push(fileNew._id);
        }
      }

      if (req.files.residencyVisa) {
        var residencyVisaAllFiles = [];

        for (const file of req.files.residencyVisa) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);

          residencyVisaAllFiles.push(fileNew._id);
        }
      }

      if (req.files.emiratesId) {
        var emiratesIdAllFiles = [];

        for (const file of req.files.emiratesId) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);

          emiratesIdAllFiles.push(fileNew._id);
        }
      }
      Visa.create(
        {
          company: company,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          passportNo: passportNo.trim(),
          passportIssue: passportIssue.trim(),
          passportExpiry: passportExpiry.trim(),
          passportCountry: passportCountry.trim(),
          entryPermitIssued: entryPermitIssued.trim(),
          residencyVisaIssued: residencyVisaIssued.trim(),
          emiratesIdIssued: emiratesIdIssued.trim(),
          passport: PassportAllFiles,
          entryPermit: entryPermitAllFiles,
          residencyVisa: residencyVisaAllFiles,
          emiratesId: emiratesIdAllFiles,
          employee: employee,
          visaUID: visaUID,
          familyMember: familyMember,
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
