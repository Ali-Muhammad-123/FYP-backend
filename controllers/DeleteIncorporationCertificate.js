const IncorporationCertificate = require("../models/IncorporationCertificate");
const deleteFile = require("./DeleteFile")

class DeleteIncorporationCertificateController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {

            var oldIncorporationCertificate = await IncorporationCertificate.findOne({ _id: id });
            if (oldIncorporationCertificate && oldIncorporationCertificate.file) {
                deleteFile.Execute(oldIncorporationCertificate.file, req.route.path)
            }

            IncorporationCertificate.findOneAndDelete({ "_id": id }, function (err, response) {
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
