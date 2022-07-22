const credential = require("express").Router();
const UpdateCredential = require("../controllers/UpdateCredential");
const auth = require("../middleware/adminAuth");

credential.put("/credential", async (req, res) => {
    UpdateCredential.Execute(req, res);
});


module.exports = credential;
