module.exports = {
    name: 'invite',
    description: 'Gives you the invite link of the bot',
    async execute(Discord, client, message){
        const botInvite =  new Discord.MessageEmbed()
        .setColor('white')
        .setAuthor('MMR Bot - Invite Link', client.user.displayAvatarURL())
        .setDescription('[Here is the link](https://discord.com/api/oauth2/authorize?client_id=850218581501542400&permissions=2148006976&scope=bot)')
        .setFooter('Thanks for using MMR Bot', 'https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Hearth.png');
        message.channel.send(botInvite);
    }
}