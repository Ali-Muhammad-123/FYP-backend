const posttradeLicenseController = require("../controllers/PostTradeLicenseController");
const gettradeLicenseController = require("../controllers/GetTradeLicenseController");
const auth = require("../middleware/auth");
const tradeLicenseRouter = require("express").Router();
const { body, validationResult } = require('express-validator');

tradeLicenseRouter.post('/uploadtradelicense', auth, async (req, res) => {



    posttradeLicenseController.Execute(req, res);


})

tradeLicenseRouter.get('/gettradelicense', auth, async (req, res) => {



    gettradeLicenseController.Execute(req, res);


})

module.exports = tradeLicenseRouter;