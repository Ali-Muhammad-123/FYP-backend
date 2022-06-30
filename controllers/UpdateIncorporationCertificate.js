const IncorporationCertificate = require("../models/IncorporationCertificate");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateIncorporationCertificateController {

    static async Execute(req, res) {

        const { company } = req.body;
        const { _id } = req.query;

        if (company != undefined &&
            _id != undefined) {

            if (req.file != undefined) {

                var oldIncorporationCertificate = await IncorporationCertificate.findOne({ _id: _id });
                if (oldIncorporationCertificate) {
                    deleteFile.Execute(oldIncorporationCertificate.file)
                }

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

                        IncorporationCertificate.findOneAndUpdate(
                            { '_id': _id },
                            {
                                $set:
                                {
                                    company: company,
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
                                        message: `Incorporation Certificate Updated with file.`,
                                    });
                                }
                            }
                        )
                    }
                });

            } else {

                IncorporationCertificate.findOneAndUpdate(
                    { '_id': _id },
                    {
                        $set:
                        {
                            company: company
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
                                message: `Incorporation Certificate Updated without file.`,
                            });
                        }
                    }
                )

            }





        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}

module.exports = UpdateIncorporationCertificateController