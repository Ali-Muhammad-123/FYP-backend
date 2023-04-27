const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	regno: {
		type: Number,
		required: false,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: false,
	},
	highestQualification: {
		type: String,
		required: false,
	},
	designation: {
		type: String,
		required: false,
	},
	program: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "File",
		required: false,
	},
	final1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "grade",
		required: false,
	},
	final2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "grade",
		required: false,
	},
	mid1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "grade",
		required: false,
	},
	mid2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "grade",
		required: false,
	},
});

module.exports = mongoose.model("User", UserSchema);
