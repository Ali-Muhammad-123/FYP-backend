const Contact = require("../models/contact");


class UpdateContactController {

    static async Execute(req, res) {

        const { email, phoneNumber, address } = req.body;
        const { id } = req.query;

        if (
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {


            Contact.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        email: email,
                        phoneNumber: phoneNumber,
                        address: address,
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        res.status(400).json({
                            message: `Error: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            message: `contact Updated.`,
                        });
                    }
                }
            )
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }



    }
}

module.exports = UpdateContactController;