const User = require("../models/user");

class GetUserController {

    static async Execute(req, res) {

        const { id } = req.query

        if (id != undefined) {


            const user = User.findById(id, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {

                    if (result) {
                        res.status(200).send({
                            message: "Successfull",
                            _id: result._id,
                            email: result.email,
                            firstName: result.firstName,
                            lastName: result.lastName
                        });
                    } else {
                        res.status(403).send({
                            message: "No records found!"
                        });
                    }


                }

            });

        } else {
            const user = await User.find().select("_id email firstName lastName");

            if (user && user.length > 0) {
                res.status(200).send({
                    user: user
                });
            } else {
                res.status(403).send({
                    message: "No records found!"
                });
            }
        }
    };
}



module.exports = GetUserController;
