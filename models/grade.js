const mongoose = require("mongoose");

const GradeSchema = mongoose.Schema(
	{
		remarks: {
			type: String,
			required: false,
		},

		presentation: {
			type: Number,
			required: false,
		},
		code: {
			type: Number,
			required: false,
		},
		erd: {
			type: Number,
			required: false,
		},
		srs: {
			type: Number,
			required: false,
		},
		formatting: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("grade", GradeSchema);
