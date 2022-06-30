const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")

class UpdateArticleOfIncoporationController {

    static async Execute(req, res) {

        const { company, message } = req.body;
        const { _id } = req.query;

        if (company != undefined &&
            message != undefined &&
            _id != undefined
        ) {

            if (req.file != undefined) {

                var oldArticlesOfIncorporation = await ArticlesOfIncorporation.findOne({ _id: _id });
                if (oldArticlesOfIncorporation) {
                    deleteFile.Execute(oldArticlesOfIncorporation.file)
                }


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
                                    company: company,
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
                                        message: `Article of Incorporation Updated with file.`,
                                    });
                                }
                            }
                        )


                    }
                });
            } else {
                ArticlesOfIncorporation.findOneAndUpdate(
                    { '_id': _id },
                    {
                        $set:
                        {
                            company: company,
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