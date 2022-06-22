const Client = require("../models/Client");

class GetClientController {

    static async Execute(req, res) {

        const { id } = req.query

        if (id != undefined) {


            const client = Client.findById(id, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {

                    if (result) {
                        res.status(200).send({
                            message: "Successfull",
                            client: result
                        });
                    } else {
                        res.status(400).send({
                            message: "No records found!"
                        });
                    }


                }

            });

        } else {
            const client = await Client.find();

            if (client && client.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    client: client
                });
            } else {
                res.status(400).send({
                    message: "No records found!"
                });
            }
        }


    }
}


module.exports = GetClientController;