const Appointment = require("../models/appointment");

class GetAppointmentController {

    static async Execute(req, res) {

        const { user } = req.body;

        if (user != undefined) {



            var appointment = await Appointment.find({

                user: user
            }).populate({
                path: 'user',
                select:
                    'firstName lastName',
            }).populate({
                path: 'file',
                select:
                    'file',
            });

            if (appointment && appointment.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    appointment: appointment
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var appointment = await Appointment.find().populate({
                path: 'user',
                select:
                    'firstName lastName',
            }).populate({
                path: 'file',
                select:
                    'file',

            });

            if (appointment && appointment.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    appointment: appointment
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetAppointmentController