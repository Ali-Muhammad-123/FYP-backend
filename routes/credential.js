const credential = require("express").Router();
const UpdateCredential = require("../controllers/UpdateCredential");
const UpdateFingerprint = require("../controllers/UpdateFingerprint");
const verifyBiometric = require("../controllers/verifyBiometric");
const auth = require("../middleware/adminAuth");

credential.post("/verifyBiometric", async (req, res) => {
	verifyBiometric.Execute(req, res);
});

credential.put("/credential", async (req, res) => {
	UpdateCredential.Execute(req, res);
});

credential.put("/publickey", async (req, res) => {
	UpdateFingerprint.Execute(req, res);
});

module.exports = credential;
