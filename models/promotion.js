const mongoose = require("mongoose");

const PromotionSchema = mongoose.Schema(
  {
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("promotion", PromotionSchema);
