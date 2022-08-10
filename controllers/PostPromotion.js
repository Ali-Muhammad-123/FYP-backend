const Promotion = require("../models/promotion");
const File = require("../models/file");

class PostpromotionController {
  static async Execute(req, res) {
    const { image, link } = req.body;
    console.log(req.body);
    if (req.file != undefined && link != undefined && req.file != undefined) {
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
          Promotion.create(
            {
              image: result._id,
              link: link,
            },
            (err, response) => {
              if (err) {
                res.status(400).json({
                  message: `Error: ${err}`,
                });
              } else {
                res.status(200).json({
                  message: `Promotion Saved.`,
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

module.exports = PostpromotionController;
