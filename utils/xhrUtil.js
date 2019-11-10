var request = require("request");

module.exports = {
    GET: function ({
        url,
        qs = {},
        headers = {},
    }) {
        return new Promise(function (res, rej) {
            const options = {
                method: 'GET',
                url,
                qs,
                headers,
            };

            request(options, function (error, response, body) {
                if (error) {
                    rej(error);
                };

                res(body);
            });
        })
    }
}


