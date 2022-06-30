const Feedback = require("../models/feedback");

class GetFeedbackController {
  static async Execute(req, res) {
    const { id } = req.params;

    if (id != undefined) {
      var feedback = await Feedback.find({
        _id: id,
      }).populate({
        path: "user",
        select: "firstName lastName",
      });

      if (feedback && feedback.length > 0) {
        res.status(200).json({
          message: "Sucess",
          feedback: feedback,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    } else {
      var feedback = await Feedback.find().populate({
        path: "user",
        select: "firstName lastName",
      });

      if (feedback && feedback.length > 0) {
        res.status(200).json({
          message: "Sucess",
          feedback: feedback,
        });
      } else {
        res.status(403).json({
          message: "No Record found",
        });
      }
    }
  }
}

module.exports = GetFeedbackController;
