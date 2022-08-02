const Calculator = require("../models/calculator");

class PostCalculatorController {

    static async Execute(req, res) {

        const { calculatorActivity, emirates, name, noOfShareholders, visaAllocation, freeZoneType, ownership,
            freeZone, price, description } = req.body;

        if (calculatorActivity != undefined &&
            emirates != undefined &&
            name != undefined &&
            noOfShareholders != undefined &&
            visaAllocation != undefined &&
            freeZoneType != undefined &&
            freeZone != undefined &&
            ownership != undefined &&
            price != undefined &&
            description != undefined) {

            const calculatorObj = new Calculator({
                calculatorActivity: calculatorActivity,
                emirates: emirates,
                name: name,
                noOfShareholders: noOfShareholders,
                visaAllocation: visaAllocation,
                freeZoneType: freeZoneType,
                freeZone: freeZone,
                price: price,
                ownership: ownership,
                description: description,
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