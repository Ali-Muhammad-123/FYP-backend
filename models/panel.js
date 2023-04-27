const mongoose = require("mongoose");

const PanelSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		groups: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "group",
				required: false,
				unique: true,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("panel", PanelSchema);
