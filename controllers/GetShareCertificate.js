const ShareCertificate = require("../models/ShareCertificate");
class GetShareCertificateController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {


            const shareCertificate = await ShareCertificate.find({
                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (shareCertificate && shareCertificate.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    shareCertificate: shareCertificate
                });
            } else {
                res.status(400).send({
                    message: "No records found!"
                });
            }

        } else {
            const shareCertificate = await ShareCertificate.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (shareCertificate && shareCertificate.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    shareCertificate: shareCertificate
                });
            } else {
                res.status(400).send({
                    message: "No records found!"
                });
            }
        }

    }

}



module.exports = GetShareCertificateController;
