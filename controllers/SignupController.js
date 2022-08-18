const user = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const otpGenerator = require("otp-generator");

const client = require("twilio")(process.env.accountSid, process.env.authToken);

class SignupController {
	static async Execute(req, res) {
		console.log(req.body);
		const {
			firstName,
			lastName,
			email,
			countryCode,
			mobile,
			nationality,
			dateOfBirth,
			passportDetails,
			role,
			password,
			isVerified,
		} = req.body;

		if (
			firstName != undefined &&
			lastName != undefined &&
			email != undefined &&
			mobile != undefined &&
			role != undefined &&
			password != undefined &&
			isVerified != undefined
		) {
			if (password === password) {
				bcrypt.hash(password, saltRounds).then(async function (hash) {
					// Store hash in your password DB.

					const User = new user({
						firstName: firstName,
						lastName: lastName,
						email: email,
						countryCode: countryCode,
						mobile: mobile,
						nationality: nationality,
						dateOfBirth: dateOfBirth,
						passportDetails: passportDetails,
						role: role,
						isVerified: isVerified,
						password: hash,
					});

					const existingUser = await user.find({
						email: email,
					});

					if (
						firstName != undefined &&
						lastName != undefined &&
						email != undefined &&
						//countryCode != undefined &&
						mobile != undefined &&
						// nationality != undefined &&
						role != undefined &&
						password != undefined &&
						confirmPassword != undefined
					) {
						if (password === confirmPassword) {
							bcrypt.hash(password, saltRounds).then(async function (hash) {
								// Store hash in your password DB.

								const User = new user({
									firstName: firstName,
									lastName: lastName,
									email: email,
									countryCode: "countryCode",
									mobile: mobile,
									nationality: nationality,
									dateOfBirth: dateOfBirth,
									passportDetails: passportDetails,
									role: role,
									password: hash,
								});

								const existingUser = await user.find({
									email: email,
								});

								if (existingUser.length > 0) {
									res.status(400).json({
										message: `Email Address is already registered`,
									});
								} else {
									await User.save(async (err, response) => {
										if (err) {
											return res.status(400).send(err);
										} else {
											const credential = new Credential({
												user: response._id,
												email: response.email,
												password: hash,
												role: "client",
											});

											await credential.save(async (err) => {
												if (err) {
													return res.status(400).send(err);
												} else {
													res.status(200).json({
														message: `user Signup sucessfull`,
														objectId: response._id,
													});
												}
											});

											var password = await otpGenerator.generate(4, {
												upperCaseAlphabets: false,
												digits: true,
												specialChars: false,
												lowerCaseAlphabets: false,
											});
											console.log(password);
										}
									});
								}
							});
						} else {
							var password = await otpGenerator.generate(4, {
								upperCaseAlphabets: false,
								digits: true,
								specialChars: false,
								lowerCaseAlphabets: false,
							});

							await Credential.findOneAndUpdate(
								{
									user: existingUser[0]._id,
								},
								{
									$set: {
										OTP: password,
									},
								}
							);

							client.messages
								.create({
									body: `Your OTP is : ${password}`,
									from: "+18304832576",
									messagingServiceSid: process.env.messagingServiceSid,
									to: mobile,
								})
								.then((message) => {
									console.log(message.sid);
									res.status(200).json({
										message: `OTP Sent`,
									});
								})
								.catch((err) => console.log(err));
							console.log("new otp sent");
						}
					} else {
						await User.save(async (err, response) => {
							if (err) {
								return res.status(400).send(err);
							} else {
								var password = await otpGenerator.generate(4, {
									upperCaseAlphabets: false,
									digits: true,
									specialChars: false,
									lowerCaseAlphabets: false,
								});

								const credential = new Credential({
									user: response._id,
									email: response.email,
									password: hash,
									OTP: password,
									role: "client",
								});

								await credential.save(async (err) => {
									if (err) {
										return res.status(400).send(err);
									}
								});

								console.log(password);
								console.log(mobile);

								client.messages
									.create({
										body: `Your OTP is : ${password}`,
										from: "+18304832576",
										messagingServiceSid: "MGb5bdb5b5c08d371d82295bb3c6b322ec",
										to: mobile,
									})
									.then((message) => {
										console.log(message.sid);
										res.status(200).json({
											message: `OTP Sent`,
											_id: response._id,
										});
									})
									.catch((err) => console.log(err));
							}
						});
					}
				});
			} else {
				res.status(400).json({
					message: `password does not match`,
				});
			}
		} else {
			res.status(400).json({
				message: `Invalid Request`,
			});
		}
	}
}

module.exports = SignupController;
