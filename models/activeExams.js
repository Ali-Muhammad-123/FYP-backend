const mongoose = require("mongoose");

const ActiveExamsSchema = mongoose.Schema(
	{
		activeExam: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("activeExams", ActiveExamsSchema);
