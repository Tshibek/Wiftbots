exports.run = (client, message, args) => {
//!clear 15
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("Nie masz uprawnien");
        message.delete();
        return
    }
    if (!args[0]) {
        message.reply("Musisz podac ilosc");
        message.delete();
        return;
    }
    if (args[0] > 100) {
        message.reply("Wartość musi wynosic max 100.");
        message.delete();
        return;
    }
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Wyczyszczono ${args[0]} wiadomości.`).then(msg => msg.delete(5000));
    }).catch(error => message.reply("Nie mozesz usunąć wiadomości starszych niż 14 dni."));


};

/*
   The "help" section for the command
   This is where you set the commands name, description, aliases and usage.
*/
exports.help = {
    name: 'clear',
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