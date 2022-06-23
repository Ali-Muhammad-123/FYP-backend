const Client = require("../models/Client");

class GetClientController {
  static async Execute(req, res) {
    const { id } = req.query;

    if (id != undefined) {
      const client = Client.findById(id, function (err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
          if (result) {
            res.status(200).send({
              message: "Successfull",
              _id: result._id,
              email: result.email,
              firstName: result.firstName,
              lastName: result.lastName,
            });
          } else {
            res.status(400).send({
              message: "No records found!",
            });
          }
        }
      });
    } else {
      const client = await Client.find().select("_id email firstName lastName");

      if (client && client.length > 0) {
        console.log(client);
        res.status(200).send({
          client: client,
        });
      } else {
        res.status(400).send({
          message: "No records found!",
        });
      }
    }
  }
}

module.exports = GetClientController;
