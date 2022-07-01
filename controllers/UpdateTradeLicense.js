const tradeLicense = require("../models/TradeLicense");
const File = require("../models/file");
const fs = require("fs");
const path = require("path");
const deleteFile = require("./DeleteFile")


class UpdateTradeLicenseController {
    static async Execute(req, res, next) {
        const {
            company,
            licenseNo,
            code,
            dateOfIssue,
            expiryDate,
            request,
        } = req.body;

        const { id } = req.query

        if (
            company != undefined &&
            licenseNo != undefined &&
            code != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            request != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {
            if (req.file != undefined) {

                const oldTradeLicense = await tradeLicense.findOne({ _id: id });
                if (oldTradeLicense && oldTradeLicense.file) {
                    deleteFile.Execute(oldTradeLicense.file, req.route.path)
                }

                // var oldTradeLicense = await tradeLicense.findOne({ _id: _id });
                // if (oldTradeLicense) {
                //     const oldfile = await File.find({ _id: oldTradeLicense.file });
                //     for (const file of oldfile) {
                //         fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
                //             if (err) {
                //                 console.error(err)
                //                 return
                //             } else {
                //                 console.log(`deletd ${_id}`);

                //             }
                //         });
                //     }
                // }


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
                        tradeLicense.findOneAndUpdate(
                            { '_id': id },
                            {
                                $set:
                                {
                                    company: company,
                                    licenseNo: licenseNo,
                                    code: code,
                                    dateOfIssue: dateOfIssue,
                                    expiryDate: expiryDate,
                                    request: request,
                                    file: result._id
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
                                        message: `Trade License updated with file.`,
                                    });
                                }
                            }
                        );
                    }
                });
            } else {

                tradeLicense.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            company: company,
                            licenseNo: licenseNo,
                            code: code,
                            dateOfIssue: dateOfIssue,
                            expiryDate: expiryDate,
                            request: request
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
                                message: `Trade License updated without file.`,
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

module.exports = UpdateTradeLicenseController;
