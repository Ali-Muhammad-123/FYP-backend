const Calculator = require("../models/calculator");

class UpdateCalculatorController {

    static async Execute(req, res) {

        const { calculatorActivity, emirates, name, noOfShareholders, visaAllocation, freeZoneType,
            freeZone, price, description } = req.body;

        const { id } = req.query;

        if (calculatorActivity != undefined &&
            emirates != undefined &&
            name != undefined &&
            noOfShareholders != undefined &&
            visaAllocation != undefined &&
            freeZoneType != undefined &&
            freeZone != undefined &&
            price != undefined &&
            description != undefined &&
            id != undefined &&
            id.match(/^[0-9a-fA-F]{24}$/)) {



            Calculator.findOneAndUpdate(
                { '_id': id },
                {
                    $set:
                    {
                        calculatorActivity: calculatorActivity.trim(),
                        emirates: emirates.trim(),
                        name: name.trim(),
                        noOfShareholders: noOfShareholders.trim(),
                        visaAllocation: visaAllocation.trim(),
                        freeZoneType: freeZoneType.trim(),
                        freeZone: freeZone.trim(),
                        price: price.trim(),
                        description: description.trim(),
                    }
                },
                { upsert: true },
                (err, response) => {
                    if (err) {
                        res.status(400).json({
                            message: `Error: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            message: `Calculator Updated.`,
                        });
                    }
                }
            );


        } else {
            res.status(400).json({
                message: `Invalid Request`,
            });
        }

    }
}



module.exports = UpdateCalculatorController;