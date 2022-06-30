const IncorporationCertificate = require("../models/IncorporationCertificate");
const deleteFile = require("./DeleteFile")

class DeleteIncorporationCertificateController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            var oldIncorporationCertificate = await IncorporationCertificate.findOne({ _id: _id });
            if (oldIncorporationCertificate) {
                deleteFile.Execute(oldIncorporationCertificate.file)
            }

            IncorporationCertificate.findOneAndDelete({ "_id": _id }, function (err, response) {
                if (!err) {
                    if (response && response != null) {
                        res.status(200).json({
                            message: `Sucessfully deleted `,
                            result: response
                        });
                    } else {
                        res.status(403).json({
                            message: `No record found`,
                        });
                    }

                }
                else {

                    res.status(400).json({
                        message: `Error : ${err}`,
                    });
                }
            });

        } else {

            res.status(400).json({
                message: `Invalid Request`,
            });

        }

    }

}



module.exports = DeleteIncorporationCertificateController;
