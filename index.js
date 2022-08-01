const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const path = require("path");
dotenv.config();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tradeLicenseRouter = require("./routes/tradeLicense");
const officeLeaseAgreementRouter = require("./routes/officeLeaseAgreement");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const articleOfIncoporationRouter = require("./routes/articleofincorporaton");
const sharecertificateRouter = require("./routes/shareCertificate");
const incorporationCertificateRouter = require("./routes/incorporationCertificate");
const immigrationCardRouter = require("./routes/immigrationCard");
const startupReques = require("./routes/startupRequest");
const visaRouter = require("./routes/visa");
const client = require("./routes/client");
const salaryCertificate = require("./routes/salaryCertificate");
const feedbackReply = require("./routes/feedbackReply");
const calculator = require("./routes/calculator");
const feedback = require("./routes/feedback");
const activity = require("./routes/activity");
const emirates = require("./routes/emirates");
const appointment = require("./routes/appointment");
const employee = require("./routes/employee");
const company = require("./routes/company");
const allUser = require("./routes/allUsers");
const credential = require("./routes/credential");
const familyMember = require("./routes/familyMember");
const companyDocs = require("./routes/companyDocs")
const contactRequest = require("./routes/contactRequest")
const filesRouter = require("./routes/Files");
const OTPVerify = require("./routes/otpVerify");
const upload = require("./middleware/upload");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(tradeLicenseRouter(upload));
app.use(officeLeaseAgreementRouter(upload));
app.use(signupRouter);
app.use(loginRouter);
app.use(articleOfIncoporationRouter(upload));
app.use(sharecertificateRouter(upload));
app.use(incorporationCertificateRouter(upload));
app.use(immigrationCardRouter(upload));
app.use(startupReques);
app.use(visaRouter(upload));
app.use(client(upload));
app.use(salaryCertificate(upload));
app.use(feedbackReply);
app.use(feedback);
app.use(calculator);
app.use(activity);
app.use(emirates);
app.use(employee);
app.use(company(upload));
app.use(allUser);
app.use(familyMember);
app.use(credential);
app.use(contactRequest);
app.use(companyDocs(upload));
app.use(appointment(upload));
app.use(filesRouter);
app.use(OTPVerify);

app.use(cors(corsOptions, { credentials: true, origin: true }));

app.listen(process.env.API_PORT, (error) => {
  if (error) {
    console.error("Error Occurred while connecting to server: ", error);
  } else {
    console.log("Connected to Server Successfully!");

    console.log("Trying to connect to database server...");

    mongoose.connect(process.env.DB_CONNECTION_STRING, (dbError) => {
      if (dbError) {
        console.error("Error Occurred while connecting to database: ", dbError);
      } else {
        console.log("Connected to Database Successfully!");
      }
    });
  }
});
