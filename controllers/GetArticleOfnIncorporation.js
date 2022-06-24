const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");

class GetArticleOfIncoporationController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {



            var articlesOfIncorporation = await ArticlesOfIncorporation.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (articlesOfIncorporation && articlesOfIncorporation.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    articlesOfIncorporation: articlesOfIncorporation
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }


        } else {

            var articlesOfIncorporation = await ArticlesOfIncorporation.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (articlesOfIncorporation && articlesOfIncorporation.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    articlesOfIncorporation: articlesOfIncorporation
                });

            } else {
                res.status(404).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetArticleOfIncoporationController