const TradeLicense = require("../models/TradeLicense");
const File = require("../models/file");
const fs = require("fs");
const path = require("path");
const deleteFile = require("./DeleteFile")

class DeleteTradeLicenseController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            var oldTradeLicense = await TradeLicense.findOne({ _id: _id });
            if (oldTradeLicense.file) {
                deleteFile.Execute(oldTradeLicense.file)
            }

            // var oldTradeLicense = await TradeLicense.findOne({ _id: _id });
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

            const result = TradeLicense.findOneAndDelete({ "_id": _id }, function (err, response) {
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



module.exports = DeleteTradeLicenseController;
