module.exports = (Discord, client, message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot);
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    const help =  new Discord.MessageEmbed()
    .setColor('white')
    .setAuthor('MMR Bot - Help', client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription("Hey! Here you have my commands. I'll remind you that I'm in beta, tons of features are coming.")
    .addFields(
        { name: '-mmr region user', value: 'Gives the MMR of a user, example: -mmr euw pr1meé' },
        { name: '-bot', value: 'Gives info of the bot (Links, author and repo)' },
        { name: '-invite', value: 'Gives the invite link of the bot' }
    )
    .setFooter('Thanks for using MMR Bot', 'https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Hearth.png');

    if (message.author.bot) return false;
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
    if (message.mentions.has(client.user.id)) {
        message.channel.send(help);
    }

    if(command) command.execute(Discord, client, message, args);
}