const Visa = require("../models/visa");
class GetVisaController {
  static async Execute(req, res) {
    const { company } = req.query;

    if (company != undefined && company.match(/^[0-9a-fA-F]{24}$/)) {
      const visa = await Visa.find({
        company: company,
      })
        .populate({
          path: "company",
        });

      if (visa && visa.length > 0) {
        res.status(200).send({
          message: "Successfull",
          visa: visa,
        });
      } else {
        res.status(403).send({
          message: "No records found!",
        });
      }
    } else {
      const visa = await Visa.find().populate({
        path: "company",
      });

      if (visa && visa.length > 0) {
        res.status(200).send({
          message: "Successfull",
          visa: visa,
        });
      } else {
        res.status(403).send({
          message: "No records found!",
        });
      }
    }
  }
}

module.exports = GetVisaController;
