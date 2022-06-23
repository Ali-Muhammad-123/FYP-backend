const Appointment = require("../models/appointment");


class PostArticleOfIncoporationController {

    static async Execute(req, res) {

        const { name, email, img, description } = req.body;

        if (name != undefined &&
            email != undefined &&
            img != undefined &&
            description != undefined) {

            const appointmentObj = new Appointment({
                name: name,
                email: email,
                img: img,
                description: description
            })

            await appointmentObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `appointment booked`,
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


module.exports = PostArticleOfIncoporationController;