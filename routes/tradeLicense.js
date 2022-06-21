const tradeLicenseController = require("../controllers/PostTradeLicenseController");
const tradeLicenseRouter = require("express").Router();

tradeLicenseRouter.post('/uploadlicense', async (req, res) => {


    tradeLicenseController.Execute(req, res);


})

module.exports = tradeLicenseRouter;