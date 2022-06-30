const IncorporationCertificate = require("../models/IncorporationCertificate");

class GetIncorporationCertificateController {
  static async Execute(req, res) {
    const { _id } = req.params;

    if (_id != undefined) {
      var incorporationCertificate = await IncorporationCertificate.find({
        _id: _id,
      }).populate({
        path: "company"
      });

    } else {
      var incorporationCertificate =
        await IncorporationCertificate.find().populate({
          path: "company"
        });
    }

    if (incorporationCertificate && incorporationCertificate.length > 0) {
      res.status(200).json({
        message: "Sucess",
        incorporationCertificate: incorporationCertificate,
      });
    } else {
      res.status(404).json({
        message: "No Record found",
      });
    }
  }
}


module.exports = GetIncorporationCertificateController;
