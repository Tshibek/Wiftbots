const Money = require("../../models/economy/money");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let user = message.mentions.users.first();
    // console.log(user.id);
    let giveMoney = Number(args[1]);
    if (!user) return message.reply("Oznacz uzytkownika, ktoremu chcesz przekazać monety i podaj ilość").then(msg => msg.delete(5000));
    if (!giveMoney) return message.reply("Musisz podać wartość").then(msg => msg.delete(5000));
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setThumbnail(user.displayAvatarURL)
        .setTitle("Bank")
        .setFooter(message.author.tag, message.author.avatarURL);
    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
            embed.setDescription(`Nazwa: ${user.username}\nTag: #${user.discriminator}`);
            embed.addField("Nie posiadasz monet.","",true);

        } else {

            if(money.money < giveMoney){
                embed.setThumbnail(message.author.displayAvatarURL);
                embed.setDescription(`Nazwa: ${message.author.username}\nTag: #${message.author.discriminator}`);
                embed.addField("Nie posiadasz wystarczajaco monet.",money.money,false);
                embed.addField("Brakuje Ci",giveMoney-money.money,false);
                return message.channel.send(embed).then(msg => msg.delete(60000));
            }else {
                money.money = money.money - giveMoney;
                money.save();
                Money.findOne({
                    userID: user.id,
                    serverID: message.guild.id,
                }, (err, money) => {
                    if (err) console.log(err);
                    if (!money) {
                        embed.setDescription(`Nazwa: ${user.username}\nTag: #${user.discriminator}`);
                        embed.addField("Nie masz konta", "", true);
                        return message.channel.send(embed).then(msg => msg.delete(5000));
                    } else {
                        embed.setDescription(`Nazwa: ${user.username}\nTag: #${user.discriminator}`);
                        embed.addField("Na twoje konto wpłyneło", giveMoney, true);
                        embed.addField("Aktualnie posiadasz", money.money + giveMoney, true);
                        money.money = money.money + giveMoney;
                        money.save();
                    }
                    return message.channel.send(embed).then(msg => msg.delete(10000));
                });
            }
            // return message.channel.send(embed);

        }

    });

};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'daj',
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
    cooldown: 5 // This should be in seconds
};