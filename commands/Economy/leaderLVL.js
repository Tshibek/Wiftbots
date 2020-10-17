const Level = require("../../models/economy/level");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    // if (message.author.id !== '485198837535997962') return;
//Grab all of the users in said server
    Level.find({
        serverID: message.guild.id
    }).sort([
        ['allEXP', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);
        console.log(res);
        let embed = new RichEmbed()
            .setTitle("Tabela Levela");
        //if there are no results
        if (res.length === 0) {
            embed.setColor("RED");
            embed.addField("Nie znaleziono", "Prosze napisz na czacie aby zdobyc expa!")
        } else if (res.length < 10) {
            //less than 10 results
            embed.setColor("BLURPLE");
            for (let i = 0; i < res.length; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left";
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Poziom**: ${res[i].level}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Poziom**: ${res[i].level}`);
                }
            }
        } else {
            //more than 10 results
            embed.setColor("BLURPLE");
            for (let i = 0; i < 10; i++) {
                let member = message.guild.members.get(res[i].userID) || "User Left";
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Poziom**: ${res[i].level}`);
                } else {
                    embed.addField(`${i + 1}. ${member.user.username}`, `**Poziom**: ${res[i].level}`);
                }
            }
        }

        message.channel.send(embed);
    })
};

exports.help = {
    name: 'leader',
    description: '',
    aliases: [],
    usage: '',
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 5 // This should be in seconds
};