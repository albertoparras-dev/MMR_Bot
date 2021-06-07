module.exports = {
    name: 'prefix',
    description: 'Changes the bot prefix',
    async execute(Discord, client, message, args){
        const db = require('quick.db');
        var guildInfo = new db.table('guildInfo');
        var split = message.content.split(' ');
        customPrefix = split[1];

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You don't have enough permissions to use this command.")
            return;
        }
        
        if (!args[0]) {
            message.channel.send('This command needs args, mention me for help');
            return;
        }

        if (args[1]) {
            message.channel.send("The prefix can't have spaces.")
            return;
        }

        guildInfo.set(`${message.guild.id}`, { prefix: `${customPrefix}` });
        message.channel.send(`The prefix has been changed succesfully to: ${customPrefix}`);
    }
}
