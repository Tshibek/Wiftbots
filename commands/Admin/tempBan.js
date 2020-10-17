const ms = require("ms");
exports.run = async (client, message, args) => {
    await message.delete();
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Nie mozna było znaleźć gracza.");
    if (tomute.hasPermission("ADMINISTRATOR")) return message.reply("Nie mozesz tego zrobic.");
    let muterole = message.guild.roles.find("name", "BANNED");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "BANNED",
                color: "#d9d9d9",
                permissions: [{
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                }]
            });
            message.guild.channels.forEach(async (channel, id) =>{
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if (!mutetime) return message.reply("Nie podałeś czasu!");

    await (tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> został zbanowany na ${ms(ms(mutetime))}`).then(msg => msg.delete(30000));

    setTimeout(function () {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> został odbanowany`).then(msg => msg.delete(30000));

    }, ms(mutetime));

};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'tempban',
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
    ownerOnly: true,
    cooldown: 5 // This should be in seconds
};