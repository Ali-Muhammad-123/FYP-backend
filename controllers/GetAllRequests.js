const requests = require("../models/requests");

class GetAllRequests {
  static async Execute(req, res) {
    var allRequests = await requests.find().populate({
      path: "user",
    });
    allRequests.reverse();
    res.status(200).json({
      allRequests,
    });
  }
}

module.exports = GetAllRequests;
