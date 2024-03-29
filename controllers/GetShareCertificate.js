const ShareCertificate = require("../models/ShareCertificate");
class GetShareCertificateController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {


            const shareCertificate = await ShareCertificate.find({
                user: user
            }).populate({
                path: 'company',
            });

            if (shareCertificate && shareCertificate.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    shareCertificate: shareCertificate
                });
            } else {
                res.status(200).send({
                    message: "No records found!"
                });
            }

        } else {
            const shareCertificate = await ShareCertificate.find().populate({
                path: 'company',
            });

            if (shareCertificate && shareCertificate.length > 0) {
                res.status(200).send({
                    message: "Successfull",
                    shareCertificate: shareCertificate
                });
            } else {
                res.status(200).send({
                    message: "No records found!"
                });
            }
        }

    }

}



module.exports = GetShareCertificateController;
