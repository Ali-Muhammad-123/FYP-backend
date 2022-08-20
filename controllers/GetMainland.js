const Mainland = require("../models/mainland");

class GetMainlandController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
      var mainland = await Mainland.find({
        emirates_id: id,
      }).populate({
        path: "emirates_id",
      });

      if (mainland && mainland.length > 0) {
        res.status(200).json({
          message: "Sucess",
          mainland: mainland,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    } else {
      var mainland = await Mainland.find().populate({
        path: "emirates_id",
      });

      if (mainland && mainland.length > 0) {
        res.status(200).json({
          message: "Sucess",
          mainland: mainland,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetMainlandController;
