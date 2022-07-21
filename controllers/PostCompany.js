const Company = require("../models/company");
const tradeLicense = require("../models/TradeLicense");
const officeLease = require("../models/OfficeLeaseAgreement");
const shareCertificate = require("../models/ShareCertificate");
const articleOfIncorporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");
const incorporationCertificate = require("../models/IncorporationCertificate");
const shareHolderSchema = require("../models/shareHolder");
const immigrationCard = require("../models/ImmigrationCard");

class PostCompanyController {
  static async Execute(req, res) {
    const {
      owner,
      name,
      licenseNo,
      licenseCode,
      judiciary,
      establishmentDate,
      issueDate,
      expiryDate,
      activities,
      code,
      dateOfIssue,
      message,
      officeLeaseIssue,
      officeLeaseExpiry,
      shareHolder,
    } = req.body;

    if (
      owner != undefined &&
      name != undefined &&
      licenseNo != undefined &&
      judiciary != undefined &&
      establishmentDate != undefined &&
      issueDate != undefined &&
      expiryDate != undefined &&
      activities != undefined &&
      officeLeaseIssue != undefined &&
      officeLeaseExpiry != undefined
    ) {
      if (shareHolder != undefined) {
        var allShareHolder = [];
        for (const shareholderObj of JSON.parse(shareHolder)) {
          console.log(shareholderObj);
          if (
            shareholderObj.firstName != undefined &&
            shareholderObj.lastName != undefined &&
            shareholderObj.email != undefined &&
            shareholderObj.mobile != undefined
            // shareholderObj.nationality != undefined &&
            // shareholderObj.countryCode != undefined &&
            // shareholderObj.dateOfBirth != undefined
          ) {
            var id = await shareHolderSchema.create({
              firstName: shareholderObj.firstName,
              lastName: shareholderObj.lastName,
              email: shareholderObj.email,
              mobile: shareholderObj.mobile,
              nationality: shareholderObj.nationality,
              countryCode: shareholderObj.countryCode,
              dateOfBirth: shareholderObj.dateOfBirth,
            });
            console.log(id);
            allShareHolder.push(id._id);
          } else {
            res.status(400).json({
              message: `Invalid share holder details`,
            });
            return;
          }
        }
      }

      const company = new Company({
        owner: owner,
        shareHolder: allShareHolder,
        name: name,
        licenseNo: licenseNo,
        licenseCode: licenseCode,
        judiciary: judiciary,
        establishmentDate: establishmentDate,
        issueDate: issueDate,
        expiryDate: expiryDate,
        activities: activities,
      });

      company.save(async (err, response) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          console.log(req.files);

          if (Object.keys(req.files).includes("tradelicense")) {
            var tradelicenseAllFiles = [];
            for (const file of req.files.tradelicense) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              tradelicenseAllFiles.push(fileNew._id);
            }

            tradeLicense.create({
              company: response._id,
              licenseNo: licenseNo.trim(),
              code: code.trim(),
              dateOfIssue: dateOfIssue.trim(),
              expiryDate: expiryDate.trim(),
              file: tradelicenseAllFiles,
            });
          }

          if (Object.keys(req.files).includes("officeLease")) {
            var officeLeaseAllFiles = [];
            for (const file of req.files.officeLease) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              officeLeaseAllFiles.push(fileNew._id);
            }

            officeLease.create({
              company: response._id,
              dateOfIssue: officeLeaseIssue,
              expiryDate: officeLeaseExpiry,
              file: officeLeaseAllFiles,
            });
          }

          if (Object.keys(req.files).includes("shareCertificate")) {
            var shareCertificateAllFiles = [];
            for (const file of req.files.shareCertificate) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              shareCertificateAllFiles.push(fileNew._id);
            }

            shareCertificate.create({
              company: response._id,
              file: shareCertificateAllFiles,
            });
          }

          if (Object.keys(req.files).includes("articleOfIncorporation")) {
            var articleOfIncorporationAllFiles = [];
            for (const file of req.files.articleOfIncorporation) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              articleOfIncorporationAllFiles.push(fileNew._id);
            }

            articleOfIncorporation.create({
              company: response._id,
              file: articleOfIncorporationAllFiles,
              message: message.trim(),
            });
          }

          if (Object.keys(req.files).includes("incorporationCertificate")) {
            var incorporationCertificateAllFiles = [];
            for (const file of req.files.incorporationCertificate) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              incorporationCertificateAllFiles.push(fileNew._id);
            }

            incorporationCertificate.create({
              company: response._id,
              file: incorporationCertificateAllFiles,
              message: message.trim(),
            });
          }

          if (Object.keys(req.files).includes("immigrationCard")) {
            var immigrationCardAllFiles = [];
            for (const file of req.files.incorporationCertificate) {
              var final_file = {
                file: file.filename,
                contentType: file.mimetype,
                docOF: req.route.path,
              };
              const fileNew = await File.create(final_file);
              immigrationCardAllFiles.push(fileNew._id);
            }

            immigrationCard.create({
              company: response._id,
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
              file: immigrationCardAllFiles,
            });
          }

          res.status(200).json({
            message: `Company created sucessfully`,
          });
        }
      });
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = PostCompanyController;
