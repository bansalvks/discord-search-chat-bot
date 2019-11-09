const Discord = require('discord.js');
const logger = require('winston');
const { responseFactory } = require('./factories/responseFactory');
const { token } = require('./config.json');

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

bot.login(token)