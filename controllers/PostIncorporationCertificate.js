const IncorporationCertificate = require("../models/IncorporationCertificate");
const File = require("../models/file");

class PostIncorporationCertificateController {

    static async Execute(req, res) {

        const { company } = req.body;

        if (company != undefined &&
            req.file != undefined) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
                docOF: req.route.path,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    res.status(400).json({
                        message: `Error: ${err}`,
                    });
                } else {
                    IncorporationCertificate.create(
                        {
                            company: company.trim(),
                            file: result._id,
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Incorporation Certificate Saved.`,
                                });
                            }
                        }
                    );
                }
            });



        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}

module.exports = PostIncorporationCertificateController