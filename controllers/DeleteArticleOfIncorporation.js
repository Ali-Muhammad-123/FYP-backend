const ArticleOfIncoporation = require("../models/ArticleOfIncoporation");
const deleteFile = require("./DeleteFile")

class DeleteArticleOfIncoporationController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined) {

            var oldArticleOfIncoporation = await ArticleOfIncoporation.findOne({ _id: id });
            if (oldArticleOfIncoporation && oldArticleOfIncoporation.file) {
                deleteFile.Execute(oldArticleOfIncoporation.file, req.route.path)
            }

            ArticleOfIncoporation.findOneAndDelete({ "_id": id }, function (err, response) {
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
