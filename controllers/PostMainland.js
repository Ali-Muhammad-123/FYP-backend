const Mainland = require("../models/mainland");


class PostMainlandController {

    static async Execute(req, res) {

        const { name, emirates_id } = req.body;

        if (name != undefined &&
            emirates_id != undefined) {

            const mainlandObj = new Mainland({
                name: name,
                emirates_id: emirates_id,
            })

            await mainlandObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `mainland added successfully`
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

module.exports = PostMainlandController;