const Money = require("../../models/economy/money");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');


exports.run = async (client, message, args) => {
    await message.delete();
    let gros = Number(100);
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setThumbnail(message.author.avatarURL)
        .setTitle("Grosik")
        .setDescription(`Nazwa: ${message.author.username}\nTag: #${message.author.discriminator}`)
        .setFooter(message.author.tag, message.author.avatarURL);

    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
            embed.addField("Nie posiadasz konta.", "", true);
            message.channel.send(embed).then(msg => msg.delete(5000));

        } else {
            money.money = money.money + gros;
            money.save();
            embed.addField("Dodano do twojego konta", gros.toString(), false);
            embed.addField("Aktualnie posiadasz", money.money + " monet", false);
            message.channel.send(embed).then(msg => msg.delete(10000));
        }
    });

};


exports.help = {
    name: 'grosik',
    description: '',
    aliases: [],
    usage: '',
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 3600 // This should be in seconds
};