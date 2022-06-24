const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");

class PostArticleOfIncoporationController {

    static async Execute(req, res) {

        const { user, article, message } = req.body;

        if (user != undefined &&
            message != undefined) {

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
                    ArticlesOfIncorporation.create(
                        {
                            user: user,
                            file: result._id,
                            message: message,

                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Article of Incorporation Saved.`,
                                });
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


module.exports = PostArticleOfIncoporationController;