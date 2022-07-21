const PostCompany = require("../controllers/PostCompany");
const GetCompany = require("../controllers/GetCompany");
const UpdateCompany = require("../controllers/UpdateCompany");
const DeleteCompany = require("../controllers/DeleteCompany");
const Router = require("express").Router();
const auth = require("../middleware/adminAuth");
const commonauth = require("../middleware/commonauth");

module.exports = (upload) => {
  Router.post(
    "/company",
    upload.fields([
      { name: "tradelicense", maxCount: 2 },
      { name: "officeLease", maxCount: 2 },
      { name: "shareCertificate", maxCount: 2 },
      { name: "articleOfIncorporation", maxCount: 2 },
      { name: "incorporationCertificate", maxCount: 2 },
      { name: "immigrationCard", maxCount: 2 },
    ]),
    async (req, res, next) => {
      PostCompany.Execute(req, res, next);
    }
  );

  Router.put("/company",
    upload.fields([
      { name: "tradelicense", maxCount: 2 },
      { name: "officeLease", maxCount: 2 },
      { name: "shareCertificate", maxCount: 2 },
      { name: "articleOfIncorporation", maxCount: 2 },
      { name: "incorporationCertificate", maxCount: 2 },
      { name: "immigrationCard", maxCount: 2 },

    ]),
    async (req, res) => {
      UpdateCompany.Execute(req, res);
    });

  Router.get("/company", async (req, res) => {
    GetCompany.Execute(req, res);
  });

  Router.delete("/company", async (req, res) => {
    DeleteCompany.Execute(req, res);
  });

  return Router;
};
