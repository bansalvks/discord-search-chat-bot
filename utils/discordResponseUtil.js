const Discord = require('discord.js');

module.exports = {
    buildDiscordLinks: function ({
        data,
        title,
    }) {
        const discordOutput = new Discord.RichEmbed()

        let linkOutput = '\n';

        data.forEach(function (item, i) {
            linkOutput += `${i + 1}. [${item.title}](${item.link})`;

            if (i !== data.length - 1) {
                linkOutput += '\n'
                linkOutput += '\n'
            }
        })

        discordOutput.addField(title, linkOutput)

        return discordOutput;
    },

    buildDiscordText: function ({
        textList,
        title,
    }) {
        const discordOutput = new Discord.RichEmbed()

        let listOutput = '\n';

        textList.forEach(function (text, i) {
            listOutput += `${i + 1}. ${text}`;

            if (i !== textList.length - 1) {
                listOutput += '\n'
                listOutput += '\n'
            }
        })

        discordOutput.addField(title, listOutput)

        return discordOutput;
    }
}