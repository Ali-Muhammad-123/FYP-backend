const Calculator = require("../models/calculator");

class PostCalculatorController {

    static async Execute(req, res) {

        const { calculatorActivity, emirates, name, noOfShareholders, visaAllocation, freeZoneType,
            freeZone, price, description } = req.body;

        if (calculatorActivity != undefined &&
            emirates != undefined &&
            name != undefined &&
            noOfShareholders != undefined &&
            visaAllocation != undefined &&
            freeZoneType != undefined &&
            freeZone != undefined &&
            price != undefined &&
            description != undefined) {

            const calculatorObj = new Calculator({
                calculatorActivity: calculatorActivity.trim(),
                emirates: emirates.trim(),
                name: name.trim(),
                noOfShareholders: noOfShareholders.trim(),
                visaAllocation: visaAllocation.trim(),
                freeZoneType: freeZoneType.trim(),
                freeZone: freeZone.trim(),
                price: price.trim(),
                description: description.trim(),
            })

            await calculatorObj.save((err) => {
                if (err) {
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({
                        message: `Calculator saved`,
                    });
                }
            })

        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = PostCalculatorController;