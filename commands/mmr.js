module.exports = {
    name: 'mmr',
    description: 'Tells your MMR',
    async execute(Discord, client, message, args){
        const { NodeHtmlMarkdown } = require('node-html-markdown');
        const superagent = require('superagent');
        const serverList = {
            servers: ['euw', 'eune', 'kr', 'na']
        }
        
        var split = message.content.split(' ');
        user = '';
        emblem = '';
        color = '';
        server = split[1].toLowerCase();

        // Checks if the server is available 
        if (serverList.servers.includes(server)) {
            console.log('No error')
        } else {
            message.channel.send('EUW, EUNE, KR and NA are the only available servers.');
            return;
        }

        // Takes the user from the args
        for (var i = 2; i < split.length; i++) {
            user += split[i] + '+';
        }

        user = user.slice(0, -1);
        userWithoutPlus = user.replace("+", " ");
        
        // Connects to the whatismymmr API
        superagent
        .get(`https://${server}.whatismymmr.com/api/v1/summoner?name=${user}`)
        .end((err, res) => {
        let body = res.body;

        // Checks if there was a error at calling the API
        if (body.hasOwnProperty('error')) {
            message.channel.send(body.error.message);
            return;
        }

        // Converts the HTML from the API to Markdown using the node-html-markdown package
        let means = NodeHtmlMarkdown.translate(body.ranked.summary).split('**').join('** ');

        // Check the Rank of the user
        if (body.ranked.closestRank.includes("Iron")) {
            emblem = "Iron";
            color = "#808080";
        } else if (body.ranked.closestRank.includes("Bronze")) {
            emblem = "Bronze";
            color = "#782a00";
        } else if (body.ranked.closestRank.includes("Silver")) {
            emblem = "Silver";
            color = "#a8a8a8";
        } else if (body.ranked.closestRank.includes("Gold")) {
            emblem = "Gold";
            color = "#d9b225";
        } else if (body.ranked.closestRank.includes("Platinum")) {
            emblem = "Platinum";
            color = "#87d4cb";
        } else if (body.ranked.closestRank.includes("Diamond")) {
            emblem = "Diamond";
            color = "#89a2fa";
        } else if (body.ranked.closestRank.includes("Master")) {
            emblem = "Master";
            color = "#7f6eff";
        } else if (body.ranked.closestRank.includes("Grandmaster")) {
            emblem = "Grandmaster";
            color = "#b30404";
        } else if (body.ranked.closestRank.includes("Challenger")) {
            emblem = "Challenger";
            color = "#ffd969";
        };

        const embedMMR =  new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`The MMR of ${userWithoutPlus} is`, client.user.displayAvatarURL(),`https://${server}.whatismymmr.com/${user}`)
        .setThumbnail(`https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Emblem_${emblem}.png`)
        .setDescription(means)
        .addFields(
            { name:'Numeric', value: body.ranked.avg, inline: true},
            { name:'Margin of Error', value: body.ranked.err, inline: true}
        )
        .setFooter("Thanks for using MMR Bot", 'https://raw.githubusercontent.com/albertoparras-dev/MMR_Bot/main/img/Hearth.png');
        message.channel.send(embedMMR);
    });
}}
