const Company = require("../models/company");

class GetCompanyController {
  static async Execute(req, res) {
    const { id, owner } = req.query;

    if (
      (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) ||
      (owner != undefined && owner.match(/^[0-9a-fA-F]{24}$/))
    ) {
      if (owner) {
        var company = await Company.find({
          owner: owner,
        })
          .populate({
            path: "activities",
          })
          .populate({
            path: "owner",
            select: "firstName lastName",
          })
          .populate({
            path: "shareHolder",
          });
      } else {
        var company = await Company.find({
          _id: id,
        })
          .populate({
            path: "activities",
          })
          .populate({
            path: "owner",
            select: "firstName lastName",
          })
          .populate({
            path: "shareHolder",
          });
      }

      if (company && company.length > 0) {
        res.status(200).json({
          message: "Sucess",
          company: company,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    } else {
      var company = await Company.find()
        .populate({
          path: "activities",
        })
        .populate({
          path: "owner",
          select: "firstName lastName",
        });

      if (company && company.length > 0) {
        res.status(200).json({
          message: "Sucess",
          company: company,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetCompanyController;
