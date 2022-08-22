const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");

class GetArticleOfIncoporationController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {

            var articlesOfIncorporation = await ArticlesOfIncorporation.find({
                _id: id
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
            res.status(200).json({
                message: "No Record found",
            });
        }

    }
}

module.exports = GetArticleOfIncoporationController