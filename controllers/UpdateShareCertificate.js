const ShareCertificate = require("../models/ShareCertificate");
const File = require("../models/file");


class PostShareCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;


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

                    ShareCertificate.findOneAndUpdate(
                        { 'user': user },
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
                                    message: `Share certificate updated.`,
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

module.exports = PostShareCertificateController;