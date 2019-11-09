const { GET } = require('../utils/xhrHelper')
const { api: {
    newsApi,
    token,
} } = require('../config.json')

module.exports = {
    getNewsByKeyword: async function ({
        keyword
    }) {
        const url = newsApi;
        const q = keyword;

        return await GET({
            url,
            qs: {
                q,
                apiKey: token,
            }
        });
    }
}