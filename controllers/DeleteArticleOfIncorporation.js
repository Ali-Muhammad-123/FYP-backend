const ArticleOfIncoporation = require("../models/ArticleOfIncoporation");
const deleteFile = require("./DeleteFile")

class DeleteArticleOfIncoporationController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            var oldArticleOfIncoporation = await ArticleOfIncoporation.findOne({ _id: _id });
            if (oldArticleOfIncoporation) {
                deleteFile.Execute(oldArticleOfIncoporation.file)
            }

            ArticleOfIncoporation.findOneAndDelete({ "_id": _id }, function (err, response) {
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



module.exports = DeleteArticleOfIncoporationController;
