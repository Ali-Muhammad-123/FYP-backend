const Company = require("../models/company");
const tradeLicense = require("../models/TradeLicense");
const officeLease = require("../models/OfficeLeaseAgreement");
const shareCertificate = require("../models/ShareCertificate");
const articleOfIncorporation = require("../models/ArticleOfIncoporation");
const incorporationCertificate = require("../models/IncorporationCertificate");
const shareHolderSchema = require("../models/shareHolder");
const deleteFile = require("./DeleteFile")
const File = require("../models/file");

class UpdateCompanyController {

    static async Execute(req, res) {

        const { owner,
            name,
            licenseNo,
            licenseCode,
            judiciary,
            establishmentDate,
            issueDate,
            expiryDate,
            activities,
            code,
            dateOfIssue,
            message,
            officeLeaseIssue,
            officeLeaseExpiry,
            shareHolder, } = req.body;

        const { id } = req.query;

        if (
            //owner != undefined &&
            // name != undefined &&
            // licenseNo != undefined &&
            // judiciary != undefined &&
            // establishmentDate != undefined &&
            // issueDate != undefined &&
            // expiryDate != undefined &&
            // activities != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {


            Company.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        owner: owner,
                        //shareHolder: allShareHolder,
                        name: name,
                        licenseNo: licenseNo,
                        licenseCode: licenseCode,
                        judiciary: judiciary,
                        establishmentDate: establishmentDate,
                        issueDate: issueDate,
                        expiryDate: expiryDate,
                        activities: activities,
                    }
                },
                { upsert: true },
            );


            /////trade license///////////
            var tradelicenseAllFiles = [];
            if (Object.keys(req.files).includes("tradelicense")) {
                for (const file of req.files.tradelicense) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                        docOF: req.route.path,
                    };
                    const fileNew = await File.create(final_file);
                    tradelicenseAllFiles.push(fileNew._id);
                }
                console.log(tradelicenseAllFiles)
            }

            tradeLicense.findOneAndUpdate(
                { 'company': id },
                {
                    $set:
                    {
                        licenseNo: licenseNo,
                        code: code,
                        dateOfIssue: dateOfIssue,
                        expiryDate: expiryDate,
                        file: tradelicenseAllFiles,
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("trade license updated")
                    }
                }
            );

            //////office lease/////////
            var officeLeaseAllFiles = [];
            if (Object.keys(req.files).includes("officeLease")) {
                for (const file of req.files.officeLease) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                        docOF: req.route.path,
                    };
                    const fileNew = await File.create(final_file);
                    officeLeaseAllFiles.push(fileNew._id);
                }
            }
            console.log(`office lease docs: ${officeLeaseAllFiles}`)
            officeLease.findOneAndUpdate(
                { 'company': id },
                {
                    $set:
                    {
                        dateOfIssue: officeLeaseIssue,
                        expiryDate: officeLeaseExpiry,
                        file: officeLeaseAllFiles,
                    }
                },
                { upsert: true }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("office lease updated")
                    }
                }
            );




            res.status(200).json({
                message: `company Updated.`,
            });

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = UpdateCompanyController;