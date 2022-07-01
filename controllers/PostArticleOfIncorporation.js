const ArticleOfIncoporation = require("../models/ArticleOfIncoporation");
const File = require("../models/file");

class PostArticleOfIncoporationController {

  static async Execute(req, res) {

    const { company, message, } = req.body;

    if (company != undefined &&
      message != undefined
    ) {



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
          ArticleOfIncoporation.create(
            {
              company: company.trim(),
              file: result._id,
              message: message.trim(),
            },
            (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                res.status(200).json({
                  message: `Article Of Incoporation Saved.`,
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