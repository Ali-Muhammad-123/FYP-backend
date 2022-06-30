const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class deleteFile {
    static async Execute(id) {
        const file = await File.findOne({ _id: id });

        if (file) {
            if (file.file) {
                fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file.file}`)), (err) => {
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
