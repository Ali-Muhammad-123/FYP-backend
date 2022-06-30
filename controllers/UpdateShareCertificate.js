const ShareCertificate = require("../models/ShareCertificate");
const File = require("../models/file");
const deleteFile = require("./DeleteFile");

class PostShareCertificateController {

    static async Execute(req, res) {

        const { company } = req.body;
        const { _id } = req.query;

        if (company != undefined &&
            _id != undefined) {

            if (req.file != undefined) {

                var oldShareCertificate = await ShareCertificate.findOne({ _id: _id });
                if (oldShareCertificate) {
                    deleteFile.Execute(oldShareCertificate.file)
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

                        ShareCertificate.findOneAndUpdate(
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
                                        message: `Share certificate updated with file.`,
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                ShareCertificate.findOneAndUpdate(
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
                                message: `Share certificate updated without file.`,
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

module.exports = PostShareCertificateController;