const User = require("../models/user");

class GetUserController {
    static async Execute(req, res) {
        const { id } = req.query;
        console.log(id)
        console.log("hello")
        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {
            User.findById(id, function (err, result) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    if (result) {
                        res.status(200).send({
                            message: "Successfull",
                            id: result._id,
                            user: result
                        });
                    } else {
                        res.status(200).send({
                            message: "No result found!",
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
                res.status(200).send({
                    message: "No records found!",
                });
            }
        }
    }
}

module.exports = GetUserController;
