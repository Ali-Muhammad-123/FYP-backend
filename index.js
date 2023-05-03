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

const upload = require("./middleware/upload");
const client = require("./routes/client");
const loginRouter = require("./routes/login");
const groupRouter = require("./routes/group");
const panelRouter = require("./routes/panel");
const examsRouter = require("./routes/activeExams");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(client(upload));
app.use(loginRouter);
app.use(panelRouter);
app.use(groupRouter);
app.use(examsRouter);

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
