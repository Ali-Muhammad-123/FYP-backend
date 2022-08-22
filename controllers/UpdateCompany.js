const Company = require("../models/company");
const tradeLicense = require("../models/TradeLicense");
const officeLease = require("../models/OfficeLeaseAgreement");
const shareCertificate = require("../models/ShareCertificate");
const articleOfIncorporation = require("../models/ArticleOfIncoporation");
const incorporationCertificate = require("../models/IncorporationCertificate");
const immigrationCard = require("../models/ImmigrationCard");
const shareHolderSchema = require("../models/shareHolder");
const deleteFile = require("./DeleteFile");
const File = require("../models/file");
const company = require("../models/company");
const establishmentCard = require("../models/establishmentCard");

class UpdateCompanyController {
  static async Execute(req, res) {
    const {
      owner,
      name,
      licenseNo,
      licenseCode,
      judiciary,
      establishmentDate,
      issueDate,
      establishmentCardNo,
      establismentDateEstablismentCard,
      issueDateEstablismentCard,
      expiryDateEstablismentCard,
      expiryDate,
      activities,
      code,
      dateOfIssue,
      message,
      officeLeaseIssue,
      officeLeaseExpiry,
      shareHolder,
    } = req.body;

    const { id } = req.query;

    if (
      //owner != undefined &&
      // name != undefined &&
      // licenseNo != undefined &&
      // judiciary != undefined &&
      // establishmentDate != undefined &&
      // issueDate != undefined &&
      // expiryDate != undefined &&
      // activities != undefined &&
      id != undefined &&
      id.match(/^[0-9a-fA-F]{24}$/)
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
            var shareholder = await shareHolderSchema.create({
              firstName: shareholderObj.firstName,
              lastName: shareholderObj.lastName,
              email: shareholderObj.email,
              mobile: shareholderObj.mobile,
              nationality: shareholderObj.nationality,
              countryCode: shareholderObj.countryCode,
              dateOfBirth: shareholderObj.dateOfBirth,
            });
            console.log(shareholder);
            allShareHolder.push(shareholder._id);
          } else {
            res.status(400).json({
              message: `Invalid share holder details`,
            });
            return;
          }
        }
      }
      console.log(name);
      console.log(licenseNo);
      console.log(licenseCode);
      console.log(judiciary);
      console.log(establishmentDate);
      console.log(issueDate);
      console.log(expiryDate);
      Company.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            shareHolder: allShareHolder,
            name: name,
            licenseNo: licenseNo,
            licenseCode: licenseCode,
            judiciary: judiciary,
            establishmentDate: establishmentDate,
            issueDate: issueDate,
            expiryDate: expiryDate,
            activities: activities.split(","),
          },
        },
        { upsert: true, new: true },
        (err, response) => {
          if (err) {
            console.log(err);
          } else {
            console.log(response);
          }
        }
      );

      /////trade license///////////
      var tradelicenseAllFiles = [];
      console.log("files");
      console.dir(req.files.tradelicense);
      if (Object.keys(req.files).includes("tradelicense")) {
        for (const file of req.files.tradelicense) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          tradelicenseAllFiles.push(fileNew._id);
        }
        console.log(tradelicenseAllFiles);
      }

      if (tradelicenseAllFiles.length > 0) {
        tradeLicense.findOneAndUpdate(
          { company: id },
          {
            $set: {
              licenseNo: licenseNo,
              code: code,
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
              file: tradelicenseAllFiles,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("trade license updated");
            }
          }
        );
      } else {
        tradeLicense.findOneAndUpdate(
          { company: id },
          {
            $set: {
              licenseNo: licenseNo,
              code: code,
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("trade license updated");
            }
          }
        );
      }
      //////office lease/////////
      var officeLeaseAllFiles = [];
      if (Object.keys(req.files).includes("officeLease")) {
        for (const file of req.files.officeLease) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          officeLeaseAllFiles.push(fileNew._id);
        }
      }
      console.log(`office lease docs: ${officeLeaseAllFiles}`);

      if (officeLeaseAllFiles.length > 0) {
        officeLease.findOneAndUpdate(
          { company: id },
          {
            $set: {
              dateOfIssue: officeLeaseIssue,
              expiryDate: officeLeaseExpiry,
              file: officeLeaseAllFiles,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("office lease updated");
            }
          }
        );
      } else {
        officeLease.findOneAndUpdate(
          { company: id },
          {
            $set: {
              dateOfIssue: officeLeaseIssue,
              expiryDate: officeLeaseExpiry,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("office lease updated");
            }
          }
        );
      }
      ////////sahre certificate/////////
      var shareCertificateAllFiles = [];
      if (Object.keys(req.files).includes("shareCertificate")) {
        for (const file of req.files.shareCertificate) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          shareCertificateAllFiles.push(fileNew._id);
        }
      }

      console.log(`share certificate docs ${shareCertificateAllFiles}`);
      if (shareCertificateAllFiles.length > 0) {
        shareCertificate.findOneAndUpdate(
          { company: id },
          {
            $set: {
              file: shareCertificateAllFiles,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("share certificate updated");
            }
          }
        );
      }

      ///////////articleOfIncorporation//////////////

      var articleOfIncorporationAllFiles = [];
      if (Object.keys(req.files).includes("articleOfIncorporation")) {
        for (const file of req.files.articleOfIncorporation) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          articleOfIncorporationAllFiles.push(fileNew._id);
        }
      }
      console.log(
        `articleOfIncorporation docs ${articleOfIncorporationAllFiles}`
      );

      if (articleOfIncorporationAllFiles.length > 0) {
        articleOfIncorporation.findOneAndUpdate(
          { company: id },
          {
            $set: {
              file: articleOfIncorporationAllFiles,
              message: message,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("articleOfIncorporation updated");
            }
          }
        );
      }
      ///////////EstablishmentCard//////////////

      var establishmentCardAllFiles = [];
      if (Object.keys(req.files).includes("establishmentCard")) {
        for (const file of req.files.establishmentCard) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          establishmentCardAllFiles.push(fileNew._id);
        }
      }
      console.log(`establishmentCard docs ${establishmentCardAllFiles}`);

      if (establishmentCardAllFiles.length > 0) {
        establishmentCard.findOneAndUpdate(
          { company: id },
          {
            $set: {
              file: establishmentCardAllFiles,
              message: message,
              establishmentCardNo: establishmentCardNo,
              establismentDateEstablismentCard: establismentDateEstablismentCard,
              issueDateEstablismentCard: issueDateEstablismentCard,
              expiryDateEstablismentCard: expiryDateEstablismentCard
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("establishmentCardAllFiles updated");
            }
          }
        );
      }

      //////////////incorporationCertificate//////////////////

      var incorporationCertificateAllFiles = [];
      if (Object.keys(req.files).includes("incorporationCertificate")) {
        for (const file of req.files.incorporationCertificate) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          incorporationCertificateAllFiles.push(fileNew._id);
        }
      }
      console.log(
        `incorporationCertificate docs ${incorporationCertificateAllFiles}`
      );
      if (incorporationCertificateAllFiles.length > 0) {
        incorporationCertificate.findOneAndUpdate(
          { company: id },
          {
            $set: {
              file: incorporationCertificateAllFiles,
              message: message,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("incorporationCertificate updated");
            }
          }
        );
      }
      ///////////////immigrationCard/////////////////

      var immigrationCardAllFiles = [];
      if (Object.keys(req.files).includes("immigrationCard")) {
        for (const file of req.files.immigrationCard) {
          var final_file = {
            file: file.filename,
            contentType: file.mimetype,
            docOF: req.route.path,
          };
          const fileNew = await File.create(final_file);
          immigrationCardAllFiles.push(fileNew._id);
        }
      }
      console.log(`immigrationCard docs ${immigrationCardAllFiles}`);
      if (immigrationCardAllFiles.length > 0) {
        immigrationCard.findOneAndUpdate(
          { company: id },
          {
            $set: {
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
              file: immigrationCardAllFiles,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("incorporationCertificate updated");
            }
          }
        );
      } else {
        immigrationCard.findOneAndUpdate(
          { company: id },
          {
            $set: {
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
              file: [],
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log("incorporationCertificate updated");
            }
          }
        );
      }
      res.status(200).json({
        message: `company Updated.`,
      });
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = UpdateCompanyController;
