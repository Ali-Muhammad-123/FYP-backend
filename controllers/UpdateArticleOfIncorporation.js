const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");

class UpdateArticleOfIncoporationController {

    static async Execute(req, res) {

        const { user, message } = req.body;
        const { _id } = req.query;

        if (user != undefined &&
            message != undefined &&
            req.file != undefined) {

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

                    ArticlesOfIncorporation.findOneAndUpdate(
                        { '_id': _id },
                        {
                            $set:
                            {
                                user: user,
                                file: result._id,
                                message: message,
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
                                    message: `Article of Incorporation Updated.`,
                                });
                            }
                        }
                    )


                }
            });
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = UpdateArticleOfIncoporationController;