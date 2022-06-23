const ImmigrationCard = require("../models/ImmigrationCard");
const File = require("../models/file");

class PostImmigrationCardController {

    static async Execute(req, res) {

        const { user, dateOfIssue, expiryDate } = req.body;

        if (user != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined
        ) {



            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    ImmigrationCard.create(
                        {
                            user: user,
                            dateOfIssue: dateOfIssue,
                            expiryDate: expiryDate,
                            file: result._id,
                        },
                        (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("saved");
                            }
                        }
                    );
                }
            });
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = PostImmigrationCardController;