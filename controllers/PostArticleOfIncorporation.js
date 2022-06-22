const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");


class PostArticleOfIncoporationController {

    static async Execute(req, res) {

        const { client, article, message } = req.body;

        if (client != undefined &&
            article != undefined &&
            message != undefined) {

            const articlesOfIncorporation = new ArticlesOfIncorporation({
                client: client,
                article: article,
                message: message
            })

            await articlesOfIncorporation.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `article saved`,
                    });
                }
            })

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = PostArticleOfIncoporationController;