const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class GetFile {
  static async Execute(req, res) {
    const { id } = req.params;
    const file = await File.find({ _id: id });
    console.log(file);

    var fileObt = fs.readFileSync(
      path.resolve(__dirname, `../uploads/${file[0].file}`)
    );
    var bitmap = new Buffer(fileObt, "base64");
    res.contentType(file[0].contentType);
    res.send(bitmap);
  }
}

module.exports = GetFile;
