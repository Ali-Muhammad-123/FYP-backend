const Appointment = require("../models/appointment");
const File = require("../models/file");


class PostAppointmentController {

    static async Execute(req, res) {

        const { user, description } = req.body;

        if (user != undefined &&
            description != undefined &&
            req.file != undefined) {


            var final_file = {
                file: req.file.filename,
                contentType: req.file.mimetype,
                docOF: req.route.path,
            };
            File.create(final_file, function (err, result) {
                if (err) {
                    res.status(400).json({
                        message: `Error: ${err}`,
                    });
                } else {
                    Appointment.create(
                        {
                            user: user.trim(),
                            file: result._id,
                            description: description.trim(),

                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `appointment booked.`,
                                });
                            }
                        }
                    );
                }
            });
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = PostAppointmentController;