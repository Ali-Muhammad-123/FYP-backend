const Calculator = require("../models/calculator");

class GetCalculatorController {

    static async Execute(req, res) {

        const { _id } = req.params;

        if (_id != undefined) {



            var calculator = await Calculator.find({
                _id: _id
            });

            if (calculator && calculator.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    calculator: calculator
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }


        } else {

            var calculator = await Calculator.find();

            if (calculator && calculator.length > 0) {

                res.status(200).json({
                    message: "Sucess",
                    calculator: calculator
                });

            } else {
                res.status(403).json({
                    message: "No Record found",
                });
            }
        }

    }
}

module.exports = GetCalculatorController