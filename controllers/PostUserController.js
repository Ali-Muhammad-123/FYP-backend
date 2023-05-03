const User = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require("bcrypt");
const File = require("../models/file");
const Grade = require("../models/grade");
const saltRounds = 10;

class PostUserController {
	static async Execute(req, res) {
		console.log(req.body);
		const {
			name,
			email,
			regno,
			contactNumber,
			department,
			highestQualification,
			designation,
			program,
			role,
		} = req.body;
		if (
			name != undefined &&
			department != undefined &&
			highestQualification != undefined &&
			designation != undefined &&
			contactNumber != undefined &&
			email != undefined
		) {
			const existingUser = await User.find({
				email: email,
			});

			if (existingUser.length > 0) {
				res.status(400).json({
					message: `Email Address is already registered`,
				});
			} else {
				if (req.file) {
					var final_file = {
						file: req.file.filename,
						contentType: req.file.mimetype,
						docOF: req.route.path,
					};
					var file = await File.create(final_file);
				}

				const user = new User({
					name: name.trim(),
					department: department.trim(),
					highestQualification: highestQualification.trim(),
					designation: designation.trim(),
					contactNumber: contactNumber.trim(),
					email: email.trim().toLowerCase(),
					role: role,
					profilePicture: file?._id,
				});

				user.save(async (err, response) => {
					if (err) {
						return res.status(400).send(err, response);
					} else {
						bcrypt.hash("password", saltRounds).then(async function (hash) {
							// Store hash in your password DB.
							const credential = new Credential({
								user: response._id,
								email: response.email.trim(),
								password: hash,
								role: role,
							});

							credential.save((err) => {
								if (err) {
									return res.status(400).send(err);
								} else {
									res.status(200).json({
										message: `user added sucessfully`,
									});
								}
							});
						});
					}
				});
			}
		} else if (
			(name != undefined,
			email != undefined,
			regno != undefined,
			contactNumber != undefined,
			program != undefined)
		) {
			const existingUser = await User.find({
				email: email,
			});

			if (existingUser.length > 0) {
				res.status(400).json({
					message: `Email Address is already registered`,
				});
			} else {
				if (req.file) {
					var final_file = {
						file: req.file.filename,
						contentType: req.file.mimetype,
						docOF: req.route.path,
					};
					var file = await File.create(final_file);
				}

				const mid1 = await new Grade({
					remarks: "",
					presentation: 0,
					code: 0,
					erd: 0,
					srs: 0,
					formatting: 0,
				}).save();
				const mid2 = await new Grade({
					remarks: "",
					presentation: 0,
					code: 0,
					erd: 0,
					srs: 0,
					formatting: 0,
				}).save();
				const final1 = await new Grade({
					remarks: "",
					presentation: 0,
					code: 0,
					erd: 0,
					srs: 0,
					formatting: 0,
				}).save();
				const final2 = await new Grade({
					remarks: "",
					presentation: 0,
					code: 0,
					erd: 0,
					srs: 0,
					formatting: 0,
				}).save();
				const user = new User({
					name: name.trim(),
					program: program.trim(),
					regno: regno.trim(),
					contactNumber: contactNumber.trim(),
					email: email.trim().toLowerCase(),
					role: role,
					profilePicture: file?._id,
					mid1,
					mid2,
					final1,
					final2,
				});

				user.save(async (err, response) => {
					if (err) {
						return res.status(400).send(err, response);
					} else {
						bcrypt.hash("password", saltRounds).then(async function (hash) {
							// Store hash in your password DB.
							const credential = new Credential({
								user: response._id,
								email: response.email.trim(),
								password: hash,
								role: role,
							});

							credential.save((err) => {
								if (err) {
									return res.status(400).send(err);
								} else {
									res.status(200).json({
										message: `user added sucessfully`,
									});
								}
							});
						});
					}
				});
			}
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = PostUserController;
