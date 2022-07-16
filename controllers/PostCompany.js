const Company = require("../models/company");
const tradeLicense = require("../models/TradeLicense");
const officeLease = require("../models/OfficeLeaseAgreement")
const shareCertificate = require("../models/ShareCertificate")
const articleOfIncorporation = require("../models/ArticleOfIncoporation")
const File = require("../models/file");

class PostCompanyController {

    static async Execute(req, res) {

        const { owner, name, licenseNo, licenseCode, judiciary, establishmentDate,
            issueDate, expiryDate, activities,
            tradelicenseAttached, code, dateOfIssue, request,
            officeLeaseAttached,
            shareCertificateAttached,
            articleOfIncorporationAttached, message } = req.body;

        if (owner != undefined &&
            name != undefined &&
            licenseNo != undefined &&
            judiciary != undefined &&
            establishmentDate != undefined &&
            issueDate != undefined &&
            expiryDate != undefined &&
            activities != undefined) {

            const company = new Company({
                owner: owner.trim(),
                name: name.trim(),
                licenseNo: licenseNo.trim(),
                licenseCode: licenseCode.trim(),
                judiciary: judiciary.trim(),
                establishmentDate: establishmentDate.trim(),
                issueDate: issueDate.trim(),
                expiryDate: expiryDate.trim(),
                activities: activities,
            })

            await company.save(async (err, response) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {

                    console.log(req.files)

                    if (tradelicenseAttached == 'true' && req.files.tradelicense) {
                        var tradelicenseAllFiles = [];
                        for (const file of req.files.tradelicense) {
                            var final_file = {
                                file: file.filename,
                                contentType: file.mimetype,
                                docOF: req.route.path,
                            };
                            const fileNew = await File.create(final_file);
                            tradelicenseAllFiles.push(fileNew._id);
                        }

                        tradeLicense.create(
                            {
                                company: response._id,
                                licenseNo: licenseNo.trim(),
                                code: code.trim(),
                                dateOfIssue: dateOfIssue.trim(),
                                expiryDate: expiryDate.trim(),
                                request: request.trim(),
                                file: tradelicenseAllFiles,
                            })

                    }

                    if (officeLeaseAttached == 'true' && req.files.officeLease) {
                        var officeLeaseAllFiles = [];
                        for (const file of req.files.officeLease) {
                            var final_file = {
                                file: file.filename,
                                contentType: file.mimetype,
                                docOF: req.route.path,
                            };
                            const fileNew = await File.create(final_file);
                            officeLeaseAllFiles.push(fileNew._id);
                        }

                        officeLease.create(
                            {
                                company: response._id,
                                dateOfIssue: dateOfIssue,
                                expiryDate: expiryDate,
                                file: officeLeaseAllFiles,
                            })

                    }

                    if (shareCertificateAttached == 'true' && req.files.shareCertificate) {
                        var shareCertificateAllFiles = [];
                        for (const file of req.files.shareCertificate) {
                            var final_file = {
                                file: file.filename,
                                contentType: file.mimetype,
                                docOF: req.route.path,
                            };
                            const fileNew = await File.create(final_file);
                            shareCertificateAllFiles.push(fileNew._id);
                        }

                        shareCertificate.create(
                            {
                                company: response._id,
                                file: shareCertificateAllFiles,
                            },

                        );

                    }

                    if (articleOfIncorporationAttached == 'true' && req.files.articleOfIncorporation) {
                        var articleOfIncorporationAllFiles = [];
                        for (const file of req.files.articleOfIncorporation) {
                            var final_file = {
                                file: file.filename,
                                contentType: file.mimetype,
                                docOF: req.route.path,
                            };
                            const fileNew = await File.create(final_file);
                            articleOfIncorporationAllFiles.push(fileNew._id);
                        }

                        articleOfIncorporation.create(
                            {
                                company: response._id,
                                file: articleOfIncorporationAllFiles,
                                message: message.trim(),
                            },

                        );

                    }


                    res.status(200).json({
                        message: `Company created sucessfully`,
                    });
                }
            })

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = PostCompanyController;