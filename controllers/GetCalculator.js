const Calculator = require("../models/calculator");

class GetCalculatorController {

    static async Execute(req, res) {

        const { id } = req.query;

        if (id != undefined && id.match(/^[0-9a-fA-F]{24}$/)) {



            var calculator = await Calculator.find({
                _id: id
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