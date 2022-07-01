const Emirates = require("../models/emirates");

class PostEmiratesController {

    static async Execute(req, res) {

        const { name } = req.body;

        if (name != undefined) {

            const emiratesObj = new Emirates({
                name: name.trim(),

            })

            await emiratesObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Emirates saved`,
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



module.exports = PostEmiratesController;