const Credential = require("../models/credential");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UpdateCredentialController {

    static async Execute(req, res, next) {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        const { id } = req.query
        console.log(id)
        if (
            oldPassword != undefined &&
            newPassword != undefined &&
            confirmPassword != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)
        ) {

            if (newPassword === confirmPassword) {
                const oldPass = await Credential.findOne({ user: id })
                console.log(oldPass)

                const result = await bcrypt.compare(oldPassword, oldPass.password);
                console.log(result)
                if (result == false) {
                    res.status(400).json({
                        message: `inncorrect password`,
                    });
                } else {
                    const hash = await bcrypt.hash(newPassword, saltRounds)
                    Credential.findOneAndUpdate(
                        { 'user': id },
                        {
                            $set:
                            {
                                password: hash
                            }
                        },
                        (err, response) => {
                            if (err) {
                                res.status(400).json({
                                    message: `Error: ${err}`,
                                });
                            } else {
                                res.status(200).json({
                                    message: `Password Updated.`,
                                });
                                console.log(response)
                            }
                        }
                    );
                }

            } else {
                res.status(400).json({
                    message: `password does not match`,
                });
            }
        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }
    }
}

module.exports = UpdateCredentialController;
