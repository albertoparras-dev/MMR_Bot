const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

client.login(process.env.TOKEN);