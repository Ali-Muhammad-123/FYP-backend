const credential = require("../models/credential");
const user = require("../models/user");
class VerifyOTPController {
  static async Execute(req, res) {
    const cred = await credential.findOne({ email: req.body.email });
    console.log(cred);
    if (cred != null) {
      if (cred.OTP === req.body.otp) {
        await credential.findOneAndUpdate(
          {
            _id: cred._id,
          },
          {
            $set: {
              OTP: "",
            },
          }
        );
        console.log("verified!");
        res.status(200).json({
          message: `OTP Verified`,
        });

        await user.findOneAndUpdate(
          {
            _id: cred.user,
          },
          {
            $set: {
              isVerified: true,
            },
          }
        );
      } else {
        res.status(400).json({
          message: `Invalid OTP`,
        });
      }
    }
  }
}

module.exports = VerifyOTPController;
