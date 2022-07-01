const Appointment = require("../models/appointment");
const File = require("../models/file");
const deleteFile = require("./DeleteFile")


class UpdateAppointmentController {

    static async Execute(req, res) {

        const { user, description } = req.body;
        const { id } = req.query;

        if (user != undefined &&
            description != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {

            if (req.file != undefined) {

                var oldAppointment = await Appointment.findOne({ _id: id });
                if (oldAppointment && oldAppointment.file) {
                    deleteFile.Execute(oldAppointment.file, req.route.path)
                }

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

                        Appointment.findOneAndUpdate(
                            { '_id': id },
                            {
                                $set:
                                {
                                    user: user.trim(),
                                    file: result._id.trim(),
                                    description: description.trim(),
                                }
                            },
                            { upsert: true },
                            (err, response) => {
                                if (err) {
                                    res.status(400).json({
                                        message: `Error: ${err}`,
                                    });
                                } else {
                                    res.status(200).json({
                                        message: `appointment updated.`,
                                    });
                                }
                            }
                        );

                    }
                });
            }
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}


module.exports = UpdateAppointmentController;