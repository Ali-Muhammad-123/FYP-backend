const SalaryCertificate = require("../models/SalaryCertificate");


class PostSalaryCertificateController {

    static async Execute(req, res) {

        const { user, visa, salaryCertificate } = req.body;


        if (user != undefined &&
            visa != undefined &&
            salaryCertificate != undefined) {

            const salaryCertificateobj = new SalaryCertificate({
                user: user,
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