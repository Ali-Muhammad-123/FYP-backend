const jwt = require("jsonwebtoken");
const tradeLicense = require("../models/TradeLicense");
const File = require("../models/file");
const fs = require("fs");
class PostTradeLicenseController {
  static async Execute(req, res, next) {
    const {
      client,
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
      client != undefined &&
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
          console.log(err);
        } else {
          tradeLicense.create(
            {
              client: client,
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
            (err, res) => {
              if (err) {
                console.log(err);
              } else {
                console.log("saved");
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
