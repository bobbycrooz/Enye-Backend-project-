/**
 * * File for the controllers
*/

const currencyHelper = require("../helpers/currency_helper")

module.exports.rateController = (req, res, next) => {
    const baseCode = req.query.base;
    const currencies = req.query.currency.split(",");

    const returnObject = {
        rates: {

        }
    }

    currencyHelper.getCurrency(baseCode, (err, response) => {
        if(!err && response) {
            returnObject.date = response.date;
            returnObject.base = response.base;

            for( i = 0; i<currencies.length; i++) {
                if(response.rates[currencies[i]]) {
                    returnObject.rates[currencies[i]] = response.rates[currencies[i]];
                } else {
                    return res.json({"Error": "Currency not found for given base: "+ currencies[i]});
                }
            }
            res.json(returnObject);
        } else {
            res.json({"Error": err});
        }
    })
}