const { INTENT_ENUMS } = require("../intentEnum");
const { saveNewMessage, getMessagesByIntent } = require('../db/chatStorage')
const { getNewsByKeyword } = require('../services/newSearchApi')
const { buildDiscordLinks } = require('../builders/discordResponseBuilder')

module.exports = {
    responseFactory: async function ({
        message,
        channelId,
        userId
    }) {

        const hasIntent = message.substring(0, 1) == '!';

        if (hasIntent) {
            const args = message.substring(1).split(' ');

            switch (args[0].toLowerCase()) {
                case INTENT_ENUMS.HEY:
                    return 'hi';
                case INTENT_ENUMS.GOOGLE:
                    const intent = args[0];
                    args.shift();

                    const currentMessage = args.join(' ');
                    saveNewMessage({
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
                            title: 'Top 5 Searches'
                        });
                    } catch (error) {
                        return 'Unable to Google due to some error';
                    }
                case INTENT_ENUMS.RESENT:
                    const searches = getMessagesByIntent({
                        userId,
                        channelId,
                        intent: INTENT_ENUMS.GOOGLE,
                        keyword: args[1] || ''
                    })
                    if (searches.length < 1) {
                        return 'You have not searches yet anything'
                    }

                    let result = 'Here are your recent searches ';

                    searches.forEach(function (item, i) {
                        result += item.message;
                        if (searches.length - 1 !== i) {
                            result += ", "
                        }
                    });

                    return result;
            }
        }

        return 'I did not get you, use !hey !google !recent to talk to me';
    }
}