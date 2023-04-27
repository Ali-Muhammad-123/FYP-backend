const mongoose = require("mongoose");

const AdvisorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		highestQualification: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
			required: true,
		},
		contactNumber: {
			type: String,
			required: true,
		},
		email: {
			type: Date,
			required: true,
		},
		file: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "File",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Advisor", AdvisorSchema);
