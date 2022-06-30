const PostCompany = require("../controllers/PostCompany");
const GetCompany = require("../controllers/GetCompany");
const UpdateCompany = require("../controllers/UpdateCompany");
const DeleteCompany = require("../controllers/DeleteCompany");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");



Router.post("/company", async (req, res) => {

    PostCompany.Execute(req, res);

});


Router.put("/company", async (req, res) => {

    UpdateCompany.Execute(req, res);

});

Router.get("/company", async (req, res) => {
    GetCompany.Execute(req, res);
});


Router.delete("/company", async (req, res) => {
    DeleteCompany.Execute(req, res);
});

module.exports = Router;
