const SalaryCertificate = require("../models/SalaryCertificate");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateSalaryCertificateController {

    static async Execute(req, res) {

        const { user, visa } = req.body;
        const { id } = req.query;

        if (user != undefined &&
            visa != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            if (req.file != undefined) {

                var oldSalaryCertificate = await SalaryCertificate.findOne({ _id: id });
                if (oldSalaryCertificate && oldSalaryCertificate.file) {
                    deleteFile.Execute(oldSalaryCertificate.file, req.route.path)
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

                        SalaryCertificate.findOneAndUpdate(
                            { '_id': id },
                            {
                                $set:
                                {
                                    user: user.trim(),
                                    visa: visa.trim(),
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
                                        message: `salary certificate updated with file.`,
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                SalaryCertificate.findOneAndUpdate(
                    { '_id': _id },
                    {
                        $set:
                        {
                            user: user.trim(),
                            visa: visa.trim(),
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
                                message: `salary certificate updated without file.`,
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

module.exports = UpdateSalaryCertificateController;