const UserSchema = require('../schemas/users')

async function saveNewMessage({
    userId,
    channelId,
    intent,
    message = "",
    ts
}) {
    //  UPSERT in mongo
    try {
        UserSchema.findOne({
            userId,
            channelId
        }, async function (error, user) {
            if (error) return;

            let newRecord = user

            if (!user) {
                newRecord = new UserSchema({
                    userId,
                    channelId
                });
            }

            newRecord.searches.push({
                intent,
                message,
            })

            await newRecord.save();
        });

    } catch (error) {
        console.error(error)
    }
}

async function getMessagesByIntent({
    userId,
    channelId,
    intent,
    keyword,
}) {
    debugger
    try {
        const records = await UserSchema.find({
            userId,
            channelId,
            'searches.intent': intent,
        });

        if (records.length < 1) {
            "No recent Searches Found";
        }

        const result = records[0].searches.filter(function (item) {
            return item.intent === intent && (!keyword || item.message.indexOf(keyword) > -1)
        })

        return JSON.parse(JSON.stringify(result));

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    saveNewMessage,
    getMessagesByIntent,
}