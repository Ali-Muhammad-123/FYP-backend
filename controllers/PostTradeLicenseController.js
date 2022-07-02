const jwt = require("jsonwebtoken");
const tradeLicense = require("../models/TradeLicense");
const Company = require("../models/company");
const File = require("../models/file");
const fs = require("fs");
class PostTradeLicenseController {
  static async Execute(req, res, next) {
    const {
      company,
      licenseNo,
      code,
      dateOfIssue,
      expiryDate,
      request,
    } = req.body;

    if (
      company != undefined &&
      licenseNo != undefined &&
      code != undefined &&
      dateOfIssue != undefined &&
      expiryDate != undefined &&
      request != undefined &&
      req.file != undefined
    ) {
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
          tradeLicense.create(
            {
              company: company.trim(),
              licenseNo: licenseNo.trim(),
              code: code.trim(),
              dateOfIssue: dateOfIssue.trim(),
              expiryDate: expiryDate.trim(),
              request: request.trim(),
              file: result._id,
            },
            (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                res.status(200).json({
                  message: `trade license created successfully`,
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
