const Consultant = require("../models/consultant");
const File = require("../models/file");

class PostConsultantController {

    static async Execute(req, res) {


        const { firstName, lastName, language } = req.body;

        if (firstName != undefined &&
            lastName != undefined &&
            language != undefined &&
            req.file != undefined
        ) {



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
                    Consultant.create(
                        {
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            language: language.trim(),
                            picture: result._id,
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Consultant Added.`,
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


module.exports = PostConsultantController;