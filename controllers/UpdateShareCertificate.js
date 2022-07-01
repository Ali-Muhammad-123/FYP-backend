const ShareCertificate = require("../models/ShareCertificate");
const File = require("../models/file");
const deleteFile = require("./DeleteFile");

class PostShareCertificateController {

    static async Execute(req, res) {

        const { company } = req.body;
        const { id } = req.query;

        if (company != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            if (req.file != undefined) {

                var oldShareCertificate = await ShareCertificate.findOne({ _id: id });
                if (oldShareCertificate && oldShareCertificate.file) {
                    deleteFile.Execute(oldShareCertificate.file, req.route.path)
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

                        ShareCertificate.findOneAndUpdate(
                            { '_id': id },
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
                    { '_id': id },
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