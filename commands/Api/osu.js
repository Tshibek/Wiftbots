// This is where the command will run, you can always modify this arrow function to be async!
const {RichEmbed} = require('discord.js');
const color = require("../../settings/colors");
const config = require("../../config");
const api = require("node-osu");
let osu = new api.Api(config.osu_token);
exports.run = (client, message, args) => {
    let osuUsername = args[0];
    osu.getUser({u: osuUsername}).then(user => {
        let osuembed = new RichEmbed()
            .setColor(color.yellow_dark)
            .setThumbnail("https://a.ppy.sh/" + user.id)
            .setTitle("Statystyki gracza osu")
            .addField("Nazwa gracza: ", user.name, true)
            .addField("Ranking: ", user.scores.total.toString(), true)
            .addField("PP: ", String(Number(user.pp.raw).toFixed(0)), true)
            .addField("Poziom: ", String(Number(user.level).toFixed(0)), true)
            .addField("Kraj: ", user.country, true)
            .addField("Rozegranych gier: ", String(user.counts.plays), true)
            .setFooter(message.author.tag, message.author.avatarURL);
        message.delete();
        message.channel.send(osuembed);

    }).catch(function (error) {
        let embed = new RichEmbed()
            .setColor(color.yellow_dark)
            .setTitle("Statystyki gracza osu")
            .setFooter(message.author.tag, message.author.avatarURL);
        if (!osuUsername) {
            message.delete();
            embed.setDescription("Musisz podać nazwe gracza");
            message.channel.send(embed);
        } else {
            message.delete();
            embed.addField("Nie znaleziono gracza o nazwie ",'" '  + osuUsername + ' "', true );
            message.channel.send(embed)
        }


    })
};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'osu',
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