const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tradeLicenseRouter = require("./routes/tradeLicense");
const officeLeaseAgreementRouter = require("./routes/officeLeaseAgreement");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const articleOfIncoporationRouter = require('./routes/articleofincorporaton');
const sharecertificateRouter = require('./routes/shareCertificate');
const incorporationCertificateRouter = require('./routes/incorporationCertificate')
const immigrationCardRouter = require('./routes/immigrationCard')
const expressAccountingRequest = require('./routes/expressAccountingRequest')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(tradeLicenseRouter);
app.use(officeLeaseAgreementRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(articleOfIncoporationRouter);
app.use(sharecertificateRouter);
app.use(incorporationCertificateRouter);
app.use(immigrationCardRouter);
app.use(expressAccountingRequest);

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