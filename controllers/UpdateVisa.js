const Visa = require("../models/visa");
const File = require("../models/file");
const fs = require("fs");
const path = require("path");
const { off } = require("process");

class PostVisaController {

    static async Execute(req, res) {

        const {
            company,
            firstName,
            lastName,
            passportNo,
            passportIssue,
            passportExpiry,
            passportCountry,
            entryPermitIssued,
            visaUID,
            residencyVisaIssued,
            emiratesIdIssued,
        } = req.body;

        const { _id } = req.query;







        if (company != undefined &&
            firstName != undefined &&
            lastName != undefined &&
            passportNo != undefined &&
            passportIssue != undefined &&
            passportExpiry != undefined &&
            passportCountry != undefined &&
            entryPermitIssued != undefined &&
            residencyVisaIssued != undefined &&
            emiratesIdIssued != undefined &&
            _id != undefined
        ) {

            var oldVisa = await Visa.findOne({ _id: _id });

            if (req.files.passport) {
                if (oldVisa) {
                    const oldfile = await File.find({ _id: oldVisa.passport });
                    for (const file of oldfile) {
                        fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
                            if (err) {
                                console.error(err)
                                return
                            } else {
                                console.log(`deletd ${_id}`);

                            }
                        });
                    }
                }

                var PassportAllFiles = [];

                for (const file of req.files.passport) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                    };
                    const fileNew = await File.create(final_file);

                    PassportAllFiles.push(fileNew._id);
                }

            }


            if (req.files.entryPermit) {
                if (oldVisa) {
                    const oldfile = await File.find({ _id: oldVisa.entryPermit });
                    for (const file of oldfile) {
                        fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
                            if (err) {
                                console.error(err)
                                return
                            } else {
                                console.log(`deletd ${_id}`);

                            }
                        });
                    }
                }

                var entryPermitAllFiles = [];

                for (const file of req.files.entryPermit) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                    };
                    const fileNew = await File.create(final_file);

                    entryPermitAllFiles.push(fileNew._id);
                }

            }

            if (req.files.residencyVisa) {
                if (oldVisa) {
                    const oldfile = await File.find({ _id: oldVisa.residencyVisa });
                    for (const file of oldfile) {
                        fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
                            if (err) {
                                console.error(err)
                                return
                            } else {
                                console.log(`deletd ${_id}`);

                            }
                        });
                    }
                }

                var residencyVisaAllFiles = [];

                for (const file of req.files.residencyVisa) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                    };
                    const fileNew = await File.create(final_file);

                    residencyVisaAllFiles.push(fileNew._id);
                }

            }


            if (req.files.emiratesId) {
                if (oldVisa) {
                    const oldfile = await File.find({ _id: oldVisa.emiratesId });
                    for (const file of oldfile) {
                        fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
                            if (err) {
                                console.error(err)
                                return
                            } else {
                                console.log(`deletd ${_id}`);

                            }
                        });
                    }
                }

                var emiratesIdAllFiles = [];

                for (const file of req.files.emiratesId) {
                    var final_file = {
                        file: file.filename,
                        contentType: file.mimetype,
                    };
                    const fileNew = await File.create(final_file);

                    emiratesIdAllFiles.push(fileNew._id);
                }

            }

            Visa.findOneAndUpdate(
                { '_id': _id },
                {
                    $set:
                    {
                        company: company,
                        firstName: firstName,
                        lastName: lastName,
                        passportNo: passportNo,
                        passportIssue: passportIssue,
                        passportExpiry: passportExpiry,
                        passportCountry: passportCountry,
                        entryPermitIssued: entryPermitIssued,
                        residencyVisaIssued: residencyVisaIssued,
                        emiratesIdIssued: emiratesIdIssued,
                        passport: PassportAllFiles,
                        entryPermit: entryPermitAllFiles,
                        residencyVisa: residencyVisaAllFiles,
                        emiratesId: emiratesIdAllFiles
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
                            message: `Visa updated with file.`,
                        });
                    }
                }
            );






        } else {
            res.status(400).json({
                message: `Invalid Requestt`,
            });
        }



    }
}


module.exports = PostVisaController;