const Money = require("../../models/economy/money");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');


exports.run = async (client, message, args) => {
    await message.delete();

    let user = message.mentions.users.first();
    let giveMoney = Number(args[1]);

    if (!giveMoney) return message.reply("Musisz podać wartość").then(msg => msg.delete(5000));

    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setThumbnail(user.displayAvatarURL)
        .setTitle("Bank")
        .setDescription(`Nazwa: ${user.username}\nTag: #${user.discriminator}`)
        .setFooter(message.author.tag, message.author.avatarURL);

    Money.findOne({
        userID: user.id,
        serverID: message.guild.id,
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
            embed.addField("Nie posiadasz konta.", "", true);
            message.channel.send(embed).then(msg => msg.delete(5000));

        } else {
            money.money = money.money + giveMoney;
            money.save();
            embed.addField("Dodano do twojego konta", giveMoney, false);
            embed.addField("Aktualnie posiadasz", money.money + " monet", false);
            message.channel.send(embed).then(msg => msg.delete(10000));
        }
    });

};


exports.help = {
    name: 'dodaj',
    description: '',
    aliases: [],
    usage: '',
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: true,
    cooldown: 5 // This should be in seconds
};