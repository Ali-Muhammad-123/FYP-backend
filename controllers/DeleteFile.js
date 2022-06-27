const File = require("../models/file");
const fs = require("fs");
const path = require("path");

class deleteFile {
    static async Execute(id) {
        const file = await File.find({ _id: id });
        console.log(file);


        fs.unlink(path.resolve(path.resolve(__dirname, `../uploads/${file[0].file}`)), (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                console.log(`deletd ${id}`);

            }
        });


    }
}

module.exports = deleteFile;
