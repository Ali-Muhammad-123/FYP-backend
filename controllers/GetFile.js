const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class GetFile {
  static async Execute(req, res) {
    const { id } = req.params;

    if (id != undefined) {
      const file = await File.find({ _id: id });
      console.log(file)

      if (file[0] && file[0].file && file[0].docOF) {
        var fileObt = fs.readFileSync(
          path.resolve(__dirname, `../${file[0].docOF}/${file[0].file}`)
        );
        var bitmap = new Buffer(fileObt, "base64");
        res.contentType(file[0].contentType);
        res.send(bitmap);
      } else {
        res.status(403).json({
          message: `no record found`,
        });
      }
    } else {
      res.status(400).json({
        message: `Invalid Request`,
      });
    }
  }
}

module.exports = GetFile;
