const ShareCertificate = require("../models/ShareCertificate");


class PostShareCertificateController {

    static async Execute(req, res) {

        const { user, shareCertificate } = req.body;


        if (user != undefined &&
            shareCertificate != undefined) {

            const shareCertificateobj = new ShareCertificate({
                user: user,
                shareCertificate: shareCertificate,
            })

            await shareCertificateobj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    return res.status(200).json({
                        message: `share certificate added successfully!`
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

module.exports = PostShareCertificateController;