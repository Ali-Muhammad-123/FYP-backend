const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");

class GetArticleOfIncoporationController {

    static async Execute(req, res) {

        const { _id } = req.query;

        if (_id != undefined) {

            var articlesOfIncorporation = await ArticlesOfIncorporation.find({
                _id: _id
            }).populate({
                path: 'company',
            });

        } else {

            var articlesOfIncorporation = await ArticlesOfIncorporation.find().populate({
                path: 'company',
            });

        }

        if (articlesOfIncorporation && articlesOfIncorporation.length > 0) {

            res.status(200).json({
                message: "Sucess",
                articlesOfIncorporation: articlesOfIncorporation
            });

        } else {
            res.status(403).json({
                message: "No Record found",
            });
        }

    }
}

module.exports = GetArticleOfIncoporationController