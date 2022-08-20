
const UpdateContact = require("../controllers/UpdateContact");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");


Router.put("/contact", auth, async (req, res) => {
    UpdateContact.Execute(req, res);
});


module.exports = Router;
