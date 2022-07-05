const Visa = require("../models/visa");
class GetVisaController {
  static async Execute(req, res) {
    const { company, employee, familyMember } = req.query;

    if ((employee != undefined && employee.match(/^[0-9a-fA-F]{24}$/)) ||
      (familyMember != undefined && familyMember.match(/^[0-9a-fA-F]{24}$/)) ||
      (company != undefined && company.match(/^[0-9a-fA-F]{24}$/))) {

      var visa;
      if (employee) {

        visa = await Visa.find({
          employee: employee,
        })
          .populate({
            path: "company",
          }).populate({
            path: "employee",
          }).populate({
            path: "familyMember",
          });

      } else if (familyMember) {
        visa = await Visa.find({
          familyMember: familyMember,
        })
          .populate({
            path: "company",
          }).populate({
            path: "employee",
          }).populate({
            path: "familyMember",
          });
      }
      else {

        visa = await Visa.find({
          company: company,
        })
          .populate({
            path: "company",
          }).populate({
            path: "employee",
          }).populate({
            path: "familyMember",
          });

      }


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
      }).populate({
        path: "employee",
      }).populate({
        path: "familyMember",
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
