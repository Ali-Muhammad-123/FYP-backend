const IncorporationCertificate = require("../models/IncorporationCertificate");

class PostIncorporationCertificateController {

    static async Execute(req, res) {

        const { user, incorporationCertificate } = req.body;

        if (user != undefined &&
            incorporationCertificate != undefined) {

            const incorporationCertificateobj = new IncorporationCertificate({
                user: user,
                incorporationCertificate: incorporationCertificate,
            })

            await incorporationCertificateobj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `incorporation certifcate added successfully`
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

module.exports = PostIncorporationCertificateController