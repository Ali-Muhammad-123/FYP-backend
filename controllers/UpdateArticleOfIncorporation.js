const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateArticleOfIncoporationController {

    static async Execute(req, res) {

        const { company, message } = req.body;
        const { id } = req.query;

        if (company != undefined &&
            message != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            if (req.file != undefined) {

                var oldArticlesOfIncorporation = await ArticlesOfIncorporation.findOne({ _id: id });
                if (oldArticlesOfIncorporation && oldArticlesOfIncorporation.file) {
                    deleteFile.Execute(oldArticlesOfIncorporation.file, req.route.path)
                }


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

                        ArticlesOfIncorporation.findOneAndUpdate(
                            { '_id': id },
                            {
                                $set:
                                {
                                    company: company.trim(),
                                    file: result._id,
                                    message: message.trim(),
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
                                        message: `Article of Incorporation Updated with file.`,
                                    });
                                }
                            }
                        )


                    }
                });
            } else {
                ArticlesOfIncorporation.findOneAndUpdate(
                    { '_id': id },
                    {
                        $set:
                        {
                            company: company.trim(),
                            message: message.trim(),
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
                                message: `Article of Incorporation Updated without file.`,
                            });
                        }
                    }
                )
            }


        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = UpdateArticleOfIncoporationController;