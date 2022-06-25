const Appointment = require("../models/appointment");
const File = require("../models/file");


class PostArticleOfIncoporationController {

    static async Execute(req, res) {

        const { user, description } = req.body;
        const { _id } = req.query;

        if (user != undefined &&
            description != undefined &&
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

                    Appointment.findOneAndUpdate(
                        { '_id': _id },
                        {
                            $set:
                            {
                                user: user,
                                file: result._id,
                                description: description,
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
                                    message: `appointment updated.`,
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


module.exports = PostArticleOfIncoporationController;