const { INTENT_ENUMS } = require("../intentEnum");
const GreetingResponseBuilder = require("../builders/response/greeting")
const HistoryResponseBuilder = require("../builders/response/history")
const SearchResponseBuilder = require("../builders/response/search")

module.exports = {
    responseFactory: async function ({
        message,
        channelId,
        userId
    }) {

        const hasIntent = message.substring(0, 1) == '!';

        if (hasIntent) {
            const args = message.substring(1).split(' ');

            const intent = args[0].toLowerCase();
            args.shift();
            const currentMessage = args.join(' ');

            switch (intent) {
                case INTENT_ENUMS.HEY:
                    return GreetingResponseBuilder.build()
                case INTENT_ENUMS.GOOGLE:
                    debugger
                    return await SearchResponseBuilder.build({
                        userId,
                        channelId,
                        intent,
                        currentMessage,
                    })
                case INTENT_ENUMS.RESENT:
                    return await HistoryResponseBuilder.build({
                        userId,
                        channelId,
                        currentMessage,
                    })
            }
        }

        return 'I did not get you, use !hey !google !recent to talk to me';
    }
}