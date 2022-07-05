const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class deleteFile {
    static async Execute(id, fpath) {
        const file = await File.findOneAndDelete({ _id: id });
        console.log(file)
        if (file) {
            if (file.file) {
                fs.unlink(path.resolve(path.resolve(__dirname, `..${fpath}/${file.file}`)), (err) => {
                    if (err) {
                        console.error(err)
                        return
                    } else {
                        console.log(`deletd file ${id}`);

                    }
                });
            }
        }
    }
}

module.exports = deleteFile;
