const { INTENT_ENUMS } = require("../intentEnum");
const { saveNewMessage, getMessagesByIntent } = require('../db/chatStorage')

module.exports = {
    responseFactory: function ({
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

                    return 'I am Googling'
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