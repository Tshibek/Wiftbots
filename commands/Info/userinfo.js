const Level= require("../../models/economy/level");
const Money = require("../../models/economy/money");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let user = message.mentions.users.first() || message.author;
    let userinfo = {};
    userinfo.avatar = user.displayAvatarURL;
    userinfo.name = user.username;
    userinfo.discrim = `#${user.discriminator}`;
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setThumbnail(userinfo.avatar)
        .setTitle("Informacje o użytkowniku")
        .setDescription(`Nazwa: ${userinfo.name}\nTag: #${userinfo.discrim}`)
        .addField("Ranking Lokalny", "0", true)
        .addField("Ranking Globalny", "0", true)
        .setFooter(message.author.tag, message.author.avatarURL);
    Level.findOne({
        userID: user.id,
        serverID: message.guild.id,
    }, (err, exp) => {
        if (err) console.log(err);
        if (!exp) {
            embed.addField("Aktualny Poziom", "1", true);
            embed.addField("Potrzebne Doświadczenia", "300", true);
            embed.addField("Całkowite Doświadczenia", "0", true);

        } else {
            embed.addField("Aktualny Poziom", exp.level, true);
            embed.addField("Potrzebne Doświadczenia", exp.exp, true);
            embed.addField("Całkowite Doświadczenia", exp.allEXP, true);

        }
        Money.findOne({
            userID: user.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) console.log(err);
            if (!money) {
                embed.addField("Posiadane Monety", "0", true);

            } else {
                embed.addField("Posiadane Monety", money.money, true);

            }
            return message.channel.send(embed).then(msg => msg.delete(10000));
        });

    });


};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'user',
    description: '',
    aliases: [],
    usage: '',
};

/*
   The "conf" section for the command
   This is where you define if the command is "enabled", "guild only", "owner only" and it's cooldown
   Note: If no cooldown specified the cooldown will be 3s by default.
*/
exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 60 // This should be in seconds
};