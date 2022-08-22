const ArticleOfIncoporation = require("../models/ArticleOfIncoporation");
const Company = require("../models/company");
const establishmentCard = require("../models/establishmentCard");
const ImmigrationCard = require("../models/ImmigrationCard");
const IncorporationCertificate = require("../models/IncorporationCertificate");
const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const ShareCertificate = require("../models/ShareCertificate");
const TradeLicense = require("../models/TradeLicense");

class GetCompanyController {
  static async Execute(req, res) {
    console.log(req.query);
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
          })
          .populate({
            path: "judiciary",
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
          })
          .populate({
            path: "judiciary",
          });
      }

      if (company && company.length > 0) {
        res.status(200).json({
          message: "Sucess",
          company: company,
        });
      } else {
        res.status(200).json({
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
        })
        .populate({
          path: "judiciary",
        })
        .populate({
          path: "shareHolder",
        });
      var companyCopy = company;
      for await (const [i, comp] of company.entries()) {
        const allTradeLicense = await TradeLicense.find({
          company: comp._id,
        });

        const allEstablishmentCard = await establishmentCard.find({
          company: comp._id,
        });

        const allOfficeLeaseAgreement = await OfficeLeaseAgreement.find({
          company: comp._id,
        });

        const allArticleOfIncoporation = await ArticleOfIncoporation.find({
          company: comp._id,
        });

        const allIncorporationCertificate = await IncorporationCertificate.find(
          { company: comp._id }
        );

        const allShareCertificate = await ShareCertificate.find({
          company: comp._id,
        });

        const allImmigrationCard = await ImmigrationCard.find({
          company: comp._id,
        });
        console.log(company[i]._doc);
        company[i] = { ...company[i]._doc };
        company[i] = { ...company[i], tradeLicense: allTradeLicense };
        company[i] = {
          ...company[i],
          establishmentCard: allEstablishmentCard,
        };
        company[i] = {
          ...company[i],
          officeLeaseAgreement: allOfficeLeaseAgreement,
        };
        company[i] = {
          ...company[i],
          articleOfIncoporation: allArticleOfIncoporation,
        };
        company[i] = {
          ...company[i],
          incorporationCertificate: allIncorporationCertificate,
        };
        company[i] = {
          ...company[i],
          shareCertificate: allShareCertificate,
        };
        company[i] = {
          ...company[i],
          immigrationCard: allImmigrationCard,
        };

        // console.log(allTradeLicense);
        // console.log(allEstablishmentCard);
        // console.log(allOfficeLeaseAgreement);
        // console.log(allArticleOfIncoporation);
        // console.log(allIncorporationCertificate);
        // console.log(allShareCertificate);
        // console.log(allImmigrationCard);

        // console.log(company[i]);
      }

      for await (const [i, comp] of company.entries()) {
        if (!comp.owner) {
          await Company.findByIdAndDelete(comp._id);
          company.splice(i, 1);
        }
      }

      if (company && company.length > 0) {
        res.status(200).json({
          message: "Sucess",
          company: company,
        });
      } else {
        res.status(200).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetCompanyController;
