const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		requests: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "requests",
				required: false,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("SupportServices", serviceSchema);
