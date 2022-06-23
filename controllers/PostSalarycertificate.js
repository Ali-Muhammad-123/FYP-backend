const SalaryCertificate = require("../models/SalaryCertificate");
const File = require("../models/file");

class PostSalaryCertificateController {

    static async Execute(req, res) {

        const { user, visa } = req.body;


        if (user != undefined &&
            visa != undefined) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    SalaryCertificate.create(
                        {
                            user: user,
                            visa: visa,
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

module.exports = PostSalaryCertificateController;