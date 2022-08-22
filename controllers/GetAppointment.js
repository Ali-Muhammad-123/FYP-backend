const Appointment = require("../models/appointment");

class GetAppointmentController {

    static async Execute(req, res) {

        const { user } = req.query;

        if (user != undefined && user.match(/^[0-9a-fA-F]{24}$/)) {



            var appointment = await Appointment.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (appointment && appointment.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    appointment: appointment
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }


        } else {

            var appointment = await Appointment.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            });

            if (appointment && appointment.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    appointment: appointment
                });

            } else {
                res.status(200).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetAppointmentController