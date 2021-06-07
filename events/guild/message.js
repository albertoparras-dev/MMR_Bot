module.exports = (Discord, client, message) => {
    const db = require('quick.db');
    var guildInfo = new db.table('guildInfo');
    let examplePrefix = '!';
    let serverPrefix = guildInfo.get(`${message.guild.id}.prefix`)
    if (serverPrefix === null) serverPrefix = process.env.DEFAULTPREFIX;
    if (serverPrefix === '!') examplePrefix = '-';

    const help =  new Discord.MessageEmbed()
    .setColor('white')
    .setAuthor('MMR Bot - Help', client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription("Hey! Here you have my commands. I'll remind you that I'm in beta, tons of features are coming.")
    .addFields(
        { name: `${serverPrefix}mmr region user`, value: `Gives the MMR of a user. Example: ${serverPrefix}mmr euw pr1meé` },
        { name: `${serverPrefix}bot`, value: 'Gives info of the bot (Links, author and repo)' },
        { name: `${serverPrefix}invite`, value: 'Gives the invite link of the bot' },
        { name: `${serverPrefix}prefix`, value: `Changes the prefix of the bot for this server (You need ADMINISTRATOR permissions). Example: ${serverPrefix}prefix ${examplePrefix}`}
    )
    .setFooter('Thanks for using MMR Bot', 'https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Hearth.png');

    if (message.mentions.has(client.user.id)) message.channel.send(help);
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (!message.content.startsWith(serverPrefix) || message.author.bot) return;
    const args = message.content.slice(serverPrefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if(command) command.execute(Discord, client, message, args);
}
