global.db = {}; // TODO: write mongo layer
/* Example
    channel = {}
        user = [{}]
            message
            intent
*/

function saveNewMessage({
    userId,
    channelId,
    intent,
    message = "",
    ts
}) {
    if (!db[channelId]) {
        db[channelId] = {}
    }

    if (!db[channelId][userId]) {
        db[channelId][userId] = []
    }

    db[channelId][userId].push({
        message,
        intent,
        ts,
    })
}

function getMessagesByIntent({
    userId,
    channelId,
    intent,
    keyword,
}) {

    if (!db[channelId]) {
        return []
    }

    if (!db[channelId][userId]) {
        return []
    }

    const result = db[channelId][userId].filter(function (item) {
        return item.intent === intent && item.message.indexOf(keyword) > -1
    })
    return result;
}

module.exports = {
    saveNewMessage,
    getMessagesByIntent,
}