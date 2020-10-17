// This is where the command will run, you can always modify this arrow function to be async!
const {RichEmbed} = require('discord.js');
const color = require("../../settings/colors");
const config = require("../../config");
const api = require("fortnite");
const fortnite = new api(config.fortnite_token);
exports.run = (client, message, args) => {
    let platform = args[0];
    let stats = args[1];
    if (args[3]) {
        let fUsername1 = args[2] + " "+  args[3];
        fortnite.user(fUsername1, `${platform}`).then(user => {
            // console.log(user.stats);
            let embed = new RichEmbed()
                .setColor(color.yellow_dark)
                .setTitle("Statystyki gracza fortnite")
                .addField("Nazwa gracza: ", fUsername1, true)
                .addField("Top 3s: ", user.stats[`${stats}`]["top_3"], true)
                .addField("Top 5s: ", user.stats[`${stats}`]["top_5"], true)
                .addField("Wygranych: ", user.stats[`${stats}`]["wins"], true)
                .addField("Wygrane/Przegrane: ", user.stats[`${stats}`]["matches"], true)
                .addField("Zabici: ", user.stats[`${stats}`]["kills"], true)
                .addField("K/D: ", user.stats[`${stats}`]["kd"], true)
                .setFooter(message.author.tag, message.author.avatarURL);
            message.delete();
            message.channel.send(embed);

        }).catch(function (error) {
            let embed = new RichEmbed()
                .setColor(color.yellow_dark)
                .setTitle("Statystyki gracza fortnite")
                .setFooter(message.author.tag, message.author.avatarURL);
            if (!fUsername1) {
                message.delete();
                embed.setDescription("Musisz podać nazwe gracza");
                message.channel.send(embed);
            } else {
                // if(!platform){
                //     message.delete();
                //     embed.setDescription("Musisz podać platforme");
                // }
                console.log(error);
                message.delete();
                embed.addField("Nie znaleziono gracza o nazwie ", '" ' + fUsername1 + ' "', true);
                message.channel.send(embed)
            }


        })
    }else {
        let fUsername1 = args[2];
        fortnite.user(fUsername1, `${platform}`).then(user => {
            // console.log(user.stats);
            let embed = new RichEmbed()
                .setColor(color.yellow_dark)
                .setTitle("Statystyki gracza fortnite")
                .addField("Nazwa gracza: ", fUsername1, true)
                .addField("Top 3s: ", user.stats[`${stats}`]["top_3"], true)
                .addField("Top 5s: ", user.stats[`${stats}`]["top_5"], true)
                .addField("Wygranych: ", user.stats[`${stats}`]["wins"], true)
                .addField("Wygrane/Przegrane: ", user.stats[`${stats}`]["matches"], true)
                .addField("Zabici: ", user.stats[`${stats}`]["kills"], true)
                .addField("K/D: ", user.stats[`${stats}`]["kd"], true)
                .setFooter(message.author.tag, message.author.avatarURL);
            message.delete();
            message.channel.send(embed);

        }).catch(function (error) {
            let embed = new RichEmbed()
                .setColor(color.yellow_dark)
                .setTitle("Statystyki gracza fortnite")
                .setFooter(message.author.tag, message.author.avatarURL);
            if (!fUsername1) {
                message.delete();
                embed.setDescription("Musisz podać nazwe gracza");
                message.channel.send(embed);
            } else {
                // if(!platform){
                //     message.delete();
                //     embed.setDescription("Musisz podać platforme");
                // }
                console.log(error);
                message.delete();
                embed.addField("Nie znaleziono gracza o nazwie ", '" ' + fUsername1 + ' "', true);
                message.channel.send(embed)
            }


        })
    }
};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'fortnite',
    description: '',
    aliases: [],
    usage: 'sprzet(pc,xbl,psn) tryb(solo,duo,squad,lifetime)  nick',
};

/*
   The "conf" section for the command
   This is where you define if the command is "enabled", "guild only", "owner only" and it's cooldown
   Note: If no cooldown specified the cooldown will be 3s by default.
*/
exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: true,
    cooldown: 5 // This should be in seconds
};