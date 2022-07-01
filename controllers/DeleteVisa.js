const Visa = require("../models/visa");
const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class DeleteVisaController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            const oldVisa = await Visa.findOne({ _id: _id });
            console.log(oldVisa)
            if (oldVisa) {

                const oldPassport = await File.find({ _id: oldVisa.passport });
                for (const file of oldPassport) {
                    fs.unlink(path.resolve(path.resolve(__dirname, `..${req.route.path}/${file.file}`)), (err) => {
                        if (err) {
                            console.error(err)
                            return
                        } else {
                            console.log(`deletd ${_id}`);

                        }
                    });
                }


                const oldEntryPermit = await File.find({ _id: oldVisa.entryPermit });
                for (const file of oldEntryPermit) {
                    fs.unlink(path.resolve(path.resolve(__dirname, `..${req.route.path}/${file.file}`)), (err) => {
                        if (err) {
                            console.error(err)
                            return
                        } else {
                            console.log(`deletd ${_id}`);

                        }
                    });
                }

                const oldresidencyVisa = await File.find({ _id: oldVisa.residencyVisa });
                for (const file of oldresidencyVisa) {
                    fs.unlink(path.resolve(path.resolve(__dirname, `..${req.route.path}/${file.file}`)), (err) => {
                        if (err) {
                            console.error(err)
                            return
                        } else {
                            console.log(`deletd ${_id}`);

                        }
                    });
                }


                const oldemiratesId = await File.find({ _id: oldVisa.emiratesId });
                for (const file of oldemiratesId) {
                    fs.unlink(path.resolve(path.resolve(__dirname, `..${req.route.path}/${file.file}`)), (err) => {
                        if (err) {
                            console.error(err)
                            return
                        } else {
                            console.log(`deletd ${_id}`);

                        }
                    });
                }

            }

            Visa.findOneAndDelete({ "_id": _id }, async function (err, response) {
                if (!err) {
                    if (response && response != null) {

                        res.status(200).json({
                            message: `Sucessfully deleted `,
                            result: response
                        });
                    } else {
                        res.status(403).json({
                            message: `No record found`,
                        });
                    }

                }
                else {
                    res.status(400).json({
                        message: `Error : ${err}`,
                    });
                }
            });

        } else {

            res.status(400).json({
                message: `Invalid Request`,
            });

        }

    }

}



module.exports = DeleteVisaController;
