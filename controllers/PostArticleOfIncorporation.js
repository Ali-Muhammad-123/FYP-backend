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
                    console.log(err);
                } else {
                    ArticlesOfIncorporation.create(
                        {
                            user: user,
                            file: result._id,
                            message: message,

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


module.exports = PostArticleOfIncoporationController;