const config = require("../../settings/author");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = (client, message, args) => {
    let avatar = client.user.displayAvatarURL;
    let botembed = new RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(color.yellow_dark)
        .setThumbnail(avatar)
        .addField("Wersja", config.version, true)
        .addField("Twórca", config.author, true)
        .addField("Biblioteka", config.library, true)
        .addField("Strona", config.website, true)
        .addField("Serwery", client.guilds.size, true)
        .addField("Użytkowników", client.users.size, true);
    message.delete();
    message.channel.send(botembed);
};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'info',
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