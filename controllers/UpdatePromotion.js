const Promotion = require("../models/promotion");

class UpdatePromotionController {
  static async Execute(req, res) {
    const { image, link } = req.body;
    const { id } = req.query;

    if (

      id.match(/^[0-9a-fA-F]{24}$/)
    ) {
      if (req.file != undefined) {
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
            Promotion.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  image: image,
                  link: link,
                },
              },
              { upsert: true },
              (err, response) => {
                if (err) {
                  res.status(400).json({
                    message: `Error: ${err}`,
                  });
                } else {
                  res.status(200).json({
                    message: `Promotion updated.`,
                  });
                }
              }
            );
          }
        });
      } else {
        Promotion.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              link: link,
            },
          },
          { upsert: true },
          (err, response) => {
            if (err) {
              res.status(400).json({
                message: `Error: ${err}`,
              });
            } else {
              res.status(200).json({
                message: `Promotion updated.`,
              });
            }
          }
        );
      }

    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = UpdatePromotionController;
