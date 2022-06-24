const IncorporationCertificate = require("../models/IncorporationCertificate");
const File = require("../models/file");

class PostIncorporationCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {


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
                    IncorporationCertificate.create(
                        {
                            user: user,
                            file: result._id,
                        },
                        (err, res) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Incorporation License Saved.`,
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