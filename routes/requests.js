const GetAllRequests = require("../controllers/GetAllRequests");

const Router = require("express").Router();

Router.get("/allRequests", async (req, res) => {
  GetAllRequests.Execute(req, res);
});

module.exports = Router;
