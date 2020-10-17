// This is where the command will run, you can always modify this arrow function to be async!
const Money = require("../../models/economy/money");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let moneta = [
        "orzeł",
        "reszka"
    ];
    let coin = moneta[Math.floor(Math.random() * moneta.length)];
    let bet = Number(args[1]);
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle("MiniGierka_1")
        .setFooter(message.author.tag, message.author.avatarURL);
    Money.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, money) => {
        if (err) console.log(err);
        if (!money) {
            embed.addField("Nie posiadasz konta", "przepraszamy", true);
        } else {
            if (args[0] === "orzeł" || args[0] === "reszka"){
                if (!bet) return message.reply("Podaj wartość swojego zakładu.").then(msg => msg.delete(5000));
                if (money.money < bet) return message.reply("Nie masz wystarczająco monet.").then(msg => msg.delete(5000));
                if (args[0] !== coin){
                    embed.addField("Przegrałeś!", coin, false);
                    embed.addField("Wypadło", coin, true);
                    embed.addField("Straciłeś", bet, true);
                    money.money = money.money-bet;
                    money.save();
                    message.channel.send(embed).then(msg => msg.delete(5000));

                }else {
                    let betX = Math.floor(bet * 2);
                    embed.addField("Wygrałeś!", coin, false);
                    embed.addField("Wypadło", coin, false);
                    embed.addField("Dostałeś", betX, false);
                    embed.addField("Posiadasz", money.money+betX, false);
                    money.money = money.money+ betX;
                    money.save();
                    message.channel.send(embed).then(msg => msg.delete(5000));
                }
            }

        }

    });


};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'moneta',
    description: '',
    aliases: [],
    usage: 'orzeł lub reszka zakład',
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