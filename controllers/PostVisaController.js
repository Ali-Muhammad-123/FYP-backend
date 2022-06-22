const Visa = require("../models/visa");

class PostVisaController {

    static async Execute(req, res) {


        const { client, companyName, visaApplicant, visaUID, visaType, jobTitle, dateOfIssue,
            expiryDate, visa } = req.body;

        if (client != undefined &&
            companyName != undefined &&
            visaApplicant != undefined &&
            visaUID != undefined &&
            visaType != undefined &&
            jobTitle != undefined &&
            dateOfIssue != undefined &&
            expiryDate != undefined &&
            visa != undefined
        ) {

            const visaObj = new Visa({
                client: client,
                companyName: companyName,
                visaApplicant: visaApplicant,
                visaUID: visaUID,
                visaType: visaType,
                jobTitle: jobTitle,
                dateOfIssue: dateOfIssue,
                expiryDate: expiryDate,
                visa: visa,

            })



            await visaObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Visa saved sucessfull`,
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


module.exports = PostVisaController;