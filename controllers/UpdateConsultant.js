const Consultant = require("../models/consultant");
const File = require("../models/file");
const deleteFile = require("./DeleteFile");

class UpdateConsultantController {

    static async Execute(req, res) {

        const { firstName, lastName, language } = req.body;
        const { id } = req.query;

        if (
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            if (req.file != undefined) {

                var oldConsultant = await Consultant.findOne({ _id: id });
                if (oldConsultant && oldConsultant.picture) {
                    console.log(oldConsultant)
                    deleteFile.Execute(oldConsultant.picture, req.route.path)
                }

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

                        Consultant.findOneAndUpdate(
                            { '_id': id },
                            {
                                $set:
                                {
                                    firstName: firstName,
                                    lastName: lastName,
                                    language: language,
                                    picture: result._id,
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
                                        message: `Consultant Updated with picture.`,
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                Consultant.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            firstName: firstName,
                            lastName: lastName,
                            language: language,
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
                                message: `consultant updated without picture.`,
                            });
                        }
                    }
                );
            }


        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }
    }
}

module.exports = UpdateConsultantController;