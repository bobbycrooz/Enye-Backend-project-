const https = require("https")
const { StringDecoder } = require("string_decoder")

const decoder = new StringDecoder("utf-8");

const currencyHelper = {};

currencyHelper.url = "https://api.exchangeratesapi.io/latest"

currencyHelper.getCurrency = (baseCode, callback) => {
    const url = currencyHelper.url+"?base="+baseCode;

    const req = https.request(url, (res) => {
        let responseData = "";

        res.on("data", data => {
            responseData += decoder.write(data);
        });

        res.on("end", () => {
            responseData += decoder.end();
            const parsedResponseData =  JSON.parse(responseData);
            callback(false, parsedResponseData);
        });
    });

    req.on("error", err => {
        callback(err, false);
    });

    req.end();
}

module.exports = currencyHelper;