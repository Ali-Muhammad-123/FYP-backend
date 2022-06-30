const User = require("../models/user");

class GetUserController {
    static async Execute(req, res) {
        const { _id } = req.query;

        if (_id != undefined) {
            User.findById(_id, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    if (result) {
                        res.status(200).send({
                            message: "Successfull",
                            _id: result._id,
                            user: result
                        });
                    } else {
                        res.status(403).send({
                            message: "No records found!",
                        });
                    }
                }
            });
        } else {
            const user = await User.find()

            if (user && user.length > 0) {
                res.status(200).send({
                    user: user,
                });
            } else {
                res.status(403).send({
                    message: "No records found!",
                });
            }
        }
    }
}

module.exports = GetUserController;
