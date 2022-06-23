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
                    console.log(err);
                } else {
                    IncorporationCertificate.create(
                        {
                            user: user,
                            file: result._id,
                        },
                        (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("saved");
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