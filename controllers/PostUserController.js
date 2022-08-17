const User = require("../models/user");
const Credential = require("../models/credential");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mailer = require("../components/mailer");
const PostCompanyController = require("./PostCompany");
const Company = require("../models/company");
const client = require("twilio")(process.env.accountSid, process.env.authToken);

class PostUserController {
  static async Execute(req, res) {
    const {
      firstName,
      lastName,
      email,
      countryCode,
      mobile,
      nationality,
      dateOfBirth,
      passportDetails,
      isVerified,
      role,
      dialCode,
    } = req.body;

    if (
      firstName != undefined &&
      lastName != undefined &&
      email != undefined &&
      countryCode != undefined &&
      mobile != undefined &&
      nationality != undefined &&
      role != undefined
    ) {
      const user = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        countryCode: countryCode.trim(),
        mobile: mobile.trim(),
        nationality: nationality.trim(),
        dateOfBirth: dateOfBirth,
        passportDetails: passportDetails,
        isVerified: isVerified,
        dialCode: dialCode,
        role: role.trim(),
      });

      const existingUser = await User.find({
        email: email,
      });

      if (existingUser.length > 0) {
        res.status(400).json({
          message: `Email Address is already registered`,
        });
      } else {
        user.save(async (err, response) => {
          if (err) {
            return res.status(400).send(err, response);
          } else {
            var password = await otpGenerator.generate(4, {
              upperCaseAlphabets: false,
              digits: true,
              specialChars: false,
              lowerCaseAlphabets: false,
            });

            // console.log(password);

            const company = new Company({
              owner: response._id,
            });

            company.save((err, response) => {
              if (err) {
                console.log(err);
                return res.status(400).send(err);
              }
            });

            const mailOptions = {
              from: process.env.SMTP_MAIL,
              to: email,
              subject: "VIRTUZONE OTP VERIFICATION",
              text: `Your OTP is : ${password}`,
            };

            await mailer.sendMail(mailOptions);

            client.messages
              .create({
                body: `Your OTP is : ${password}`,
                from: "+18304832576",
                messagingServiceSid: process.env.messagingServiceSid,
                to: `${dialCode}${mobile}`,
              })
              .then((message) => {
                console.log(message.sid);
              })
              .catch((err) => console.log(err));

            bcrypt.hash(password, saltRounds).then(async function (hash) {
              // Store hash in your password DB.
              const credential = new Credential({
                user: response._id,
                email: response.email.trim(),
                password: hash,
                role: "client",
                OTP: password,
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
