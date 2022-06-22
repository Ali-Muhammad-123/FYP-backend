const SalaryCertificate = require("../models/SalaryCertificate");


class PostSalaryCertificateController {

    static async Execute(req, res) {

        const { client, visa, salaryCertificate } = req.body;


        if (client != undefined &&
            visa != undefined &&
            salaryCertificate != undefined) {

            const salaryCertificateobj = new SalaryCertificate({
                client: client,
                visa: visa,
                salaryCertificate: salaryCertificate,
            })

            await salaryCertificateobj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `salary certificate added successfully!`
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

module.exports = PostSalaryCertificateController;