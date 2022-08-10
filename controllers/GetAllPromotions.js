const Promotion = require("../models/promotion");

class GetActivityController {
  static async Execute(req, res) {
    const allPromos = await Promotion.find();
    res.status(200).json({
      allPromos,
    });
  }
}

module.exports = GetActivityController;
