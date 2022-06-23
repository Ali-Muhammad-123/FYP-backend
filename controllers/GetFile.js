const File = require("../models/file");
const fs = require("fs");
class GetFile {
  static async Execute(req, res) {
    const { id } = req.params;
    const file = await File.find({ _id: id });
    console.log(file);
    var fileObt = fs.readFileSync(`../../uploads/${file[0].file}`);
    res.contentType(file.contentType);
    res.send(fileObt.buffer);
  }
}

module.exports = GetFile;
