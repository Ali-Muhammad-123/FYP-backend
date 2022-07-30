const GetCompanyDocs = require("../controllers/GetCompanyDocs");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");

module.exports = (upload) => {

    Router.get("/companydocs", async (req, res) => {
        GetCompanyDocs.Execute(req, res);
    });

    return Router;
};
