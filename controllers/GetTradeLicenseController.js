const TradeLicense = require("../models/TradeLicense");
class GetTradeLicenseController {
  static async Execute(req, res) {
    const { id, company } = req.query;
    console.log(company);
    if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
      const tradeLicense = await TradeLicense.find({
        _id: id,
      }).populate({
        path: "company",
      });

      if (tradeLicense && tradeLicense.length > 0) {
        res.status(200).send({
          message: "Successfull",
          tradeLicense: tradeLicense,
        });
      } else {
        res.status(200).send({
          message: "No records found!",
        });
      }
    } else if (company !== undefined && company.match(/^[0-9a-fA-F]{24}$/)) {
      const tradeLicense = await TradeLicense.find({
        company: company,
      });

      if (tradeLicense && tradeLicense.length > 0) {
        res.status(200).send({
          message: "Successfull",
          tradeLicense: tradeLicense,
        });
      } else {
        res.status(200).send({
          message: "No records found!",
        });
      }
    } else {
      const tradeLicense = await TradeLicense.find().populate({
        path: "company",
      });

      if (tradeLicense && tradeLicense.length > 0) {
        res.status(200).send({
          message: "Successfull",
          tradeLicense: tradeLicense,
          createdAt: tradeLicense.createdAt,
        });
      } else {
        res.status(200).send({
          message: "No records found!",
        });
      }
    }
  }
}

module.exports = GetTradeLicenseController;
