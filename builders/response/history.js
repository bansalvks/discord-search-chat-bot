
const { getMessagesByIntent } = require('../../db/chatStorage')
const { buildDiscordText } = require('../../utils/discordResponseUtil')
const { INTENT_ENUMS } = require('../../intentEnum')
module.exports = {
    build: async function ({
        userId,
        channelId,
        currentMessage,
    }) {
        debugger
        const searches = await getMessagesByIntent({
            userId,
            channelId,
            intent: INTENT_ENUMS.GOOGLE,
            keyword: currentMessage
        })

        if (searches.length < 1) {
            return 'You have not searches yet anything'
        }

        let title = 'Here are your recent searches';

        const textList = [];

        searches.forEach(function (item, i) {
            textList.push(item.message)
        });

        return buildDiscordText({
            title,
            textList,
        })
    }
}