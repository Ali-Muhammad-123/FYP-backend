const jwt = require("jsonwebtoken");
const tradeLicense = require("../models/TradeLicense");
const File = require("../models/file");
const fs = require("fs");
class PostTradeLicenseController {
  static async Execute(req, res, next) {
    const {
      user,
      licenseNo,
      code,
      companyName,
      judiciary,
      establishmentDate,
      dateOfIssue,
      expiryDate,
      request,
    } = req.body;

    if (
      user != undefined &&
      licenseNo != undefined &&
      code != undefined &&
      companyName != undefined &&
      judiciary != undefined &&
      establishmentDate != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      request != undefined &&
      req.file != undefined
    ) {
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
          tradeLicense.create(
            {
              user: user,
              licenseNo: licenseNo,
              code: code,
              companyName: companyName,
              judiciary: judiciary,
              establishmentDate: establishmentDate,
              dateOfIssue: dateOfIssue,
              expiryDate: expiryDate,
              request: request,
              file: result._id,
            },
            (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                res.status(200).json({
                  message: `Trade License Saved.`,
                });
              }
            }
          );
        }
      });
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = PostTradeLicenseController;
