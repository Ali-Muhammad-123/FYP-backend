const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
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
const expressAccountingRequest = require("./routes/expressAccountingRequest");
const visaRouter = require("./routes/visa");
const client = require("./routes/Client");
const salaryCertificate = require("./routes/salaryCertificate");
const filesRouter = require("./routes/Files");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

app.use(tradeLicenseRouter(upload));
app.use(officeLeaseAgreementRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(articleOfIncoporationRouter);
app.use(sharecertificateRouter);
app.use(incorporationCertificateRouter);
app.use(immigrationCardRouter);
app.use(expressAccountingRequest);
app.use(visaRouter);
app.use(client);
app.use(salaryCertificate);
app.use(filesRouter);

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
