const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
	{
		studentOne: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		studentTwo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		advisor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		semester: {
			type: Number,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		creditHours: {
			type: Number,
			required: false,
		},
		projectTitle: {
			type: String,
			required: true,
		},
		compensation: {
			type: Number,
			required: false,
		},
		briefDetail: {
			type: String,
			required: true,
		},
		hardwareRequirement: {
			type: String,
			required: false,
		},
		approximateCost: {
			type: Number,
			required: false,
		},
		accepted: {
			type: Boolean,
			required: false,
		},
		assigned: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("group", GroupSchema);
