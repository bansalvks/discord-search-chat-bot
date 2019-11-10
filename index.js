const Discord = require('discord.js');
const http = require('http');
const logger = require('winston');
const { responseFactory } = require('./factories/responseFactory');
const { token, dbURI } = require('./config.json');
const { initMongoose } = require('./utils/mongooseUtil');
const { GET } = require('./utils/xhrUtil')
// connect mongo
initMongoose(process.env.dbURI || dbURI);

// Configure logger settings
logger.remove(logger.transports.Console);

logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client();

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// user, userID, channelID, message, evt
bot.on('message', async function (req) {
    if (req.author.id === bot.user.id) {
        return;
    }

    const {
        author,
        content: message,
        channel,
    } = req;

    const response = await responseFactory({
        message,
        channelId: channel.id,
        userId: author.id
    });

    if (response) {
        channel.send(response);
    }
});

bot.login(token || process.env.DISCORD)

// HACK to keep FREE Heroku serve online
// heroku crashing if we are not listening to its port // if instance stay idle for more than 20 mins it goes off
http.createServer(function (req, res) {
    res.end(); //end the response

}).listen(process.env.PORT || 3002);

async function wakeUp() {
    await GET({
        url: "https://safe-stream-53824.herokuapp.com"
    });
    console.log("WAKE UP DYNO");
    return setTimeout(wakeUp, 1200000);
}

setTimeout(wakeUp, 1200000);