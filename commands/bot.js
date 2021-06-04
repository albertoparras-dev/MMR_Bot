module.exports = {
    name: 'bot',
    description: 'Gives you info about the bot',
    async execute(Discord, client, message){
        const botInfo =  new Discord.MessageEmbed()
        .setColor('white')
        .setAuthor('MMR Bot - Info', client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name:'Author', value: 'Friext#6935', inline: true },
            { name:'API Used', value: '[WhatIsMyMMR](https://dev.whatismymmr.com/)', inline: true },
            { name:'Library', value: 'Discord.js^12.5.3', inline: true },
            { name:'Support Server', value: '[Link](https://discord.gg/EsYym5p8px)', inline: true },
            { name:'GitHub Repo', value: '[Link](https://github.com/albertoparras-dev/MMR_Bot)', inline: true },
            { name:'Website', value: 'Coming Soon', inline: true }
        )
        .setFooter('Thanks for using MMR Bot', 'https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Hearth.png');
        message.channel.send(botInfo);
    }
}