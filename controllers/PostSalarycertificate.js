const SalaryCertificate = require("../models/SalaryCertificate");
const File = require("../models/file");

class PostSalaryCertificateController {

    static async Execute(req, res) {

        const { user, visa } = req.body;


        if (user != undefined &&
            visa != undefined &&
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
                    SalaryCertificate.create(
                        {
                            user: user,
                            visa: visa,
                            file: result._id,
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Salary Certificate Saved.`,
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

module.exports = PostSalaryCertificateController;