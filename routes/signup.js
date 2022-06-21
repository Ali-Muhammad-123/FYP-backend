
const SignupRouter = require("express").Router();
const { query, validationResult } = require('express-validator');
const SignupController = require("../controllers/SignupController");

SignupRouter.post('/signup',
    query('firstName').isAlpha(),
    query('lastName').isAlpha(),
    query('email').isEmail(),


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else {
            SignupController.Execute(req, res);
        }
    })

module.exports = SignupRouter;