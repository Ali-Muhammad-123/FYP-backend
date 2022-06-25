const IncorporationCertificate = require("../models/IncorporationCertificate");
const File = require("../models/file");

class UpdateIncorporationCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;
        const { _id } = req.query;

        if (user != undefined &&
            req.file != undefined) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    res.status(400).json({
                        message: `Error: ${err}`,
                    });
                } else {

                    IncorporationCertificate.findOneAndUpdate(
                        { '_id': _id },
                        {
                            $set:
                            {
                                user: user,
                                file: result._id,
                            }
                        },
                        { upsert: true },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Incorporation Certificate Updated.`,
                                });
                            }
                        }
                    )
                }
            });



        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}

module.exports = UpdateIncorporationCertificateController