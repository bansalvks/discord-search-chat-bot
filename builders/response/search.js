
const { saveNewMessage } = require('../../db/chatStorage')
const { getNewsByKeyword } = require('../../services/newSearchApi')
const { buildDiscordLinks } = require('../../utils/discordResponseUtil')

module.exports = {
    build: async function ({
        userId,
        channelId,
        intent,
        currentMessage,
    }) {
        if (!currentMessage) {
            return "Please provide a keyword for search";
        }

        await saveNewMessage({
            userId,
            channelId,
            intent,
            message: currentMessage || '',
            ts: new Date()
        })

        const searchResultString = await getNewsByKeyword({
            keyword: currentMessage
        })

        try {
            const searchResultJson = JSON.parse(searchResultString)

            const responseData = searchResultJson.articles
                .splice(0, 5)
                .map(function (item) {
                    return {
                        title: item.title,
                        link: item.url
                    }
                })
            return buildDiscordLinks({
                data: responseData,
                title: 'Top 5 Searches for ' + currentMessage
            });
        } catch (error) {
            return 'Unable to Google due to some error';
        }
    }
}