const klasa = require("../../rpg/class/class");
const {RichEmbed} = require('discord.js');
const color = require("../../settings/colors");
exports.run = async (client, message, args) => {
    await message.delete();

    let wojownik = klasa['wojownik'];
    let mag = klasa['mag'];
    let łucznik = klasa['łucznik'];
    let paladyn = klasa['paladyn'];


    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setFooter(message.author.tag, message.author.avatarURL);
    if (!args[0]){
        embed.setTitle("Dostępne klasy");
        embed.setDescription("Wpisz " + "`" + "$klasa nazwa" + "`" + " po wiecej informacji");
        embed.addField("wojownik",wojownik['description'], false);
        embed.addField("mag", mag['description'], false);
        embed.addField("łucznik", łucznik['description'], false);
        embed.addField("paladyn", paladyn['description'], false);
        message.channel.send(embed).then(msg => msg.delete(10000));
    }else {
        let upp = args[0].toUpperCase();
        if (message.content.includes('wojownik')){
            embed.setTitle(`${upp} - podstawowe statystyki`);
            embed.setDescription(wojownik['description']);
            embed.addField("Życie",wojownik['hp'], true);
            embed.addField("Mana",wojownik['mp'], true);
            embed.addField("Inteligencja",wojownik['int'], true);
            embed.addField("Witalność",wojownik['wit'], true);
            embed.addField("Siła",wojownik['str'], true);
            embed.addField("Zręczność",wojownik['agil'], true);
            embed.addField("Szczęście",wojownik['luck'], true);
            embed.addField("Typ walki",wojownik['att_type'], true);
            message.channel.send(embed).then(msg => msg.delete(20000));
        }
        if (message.content.includes('mag')){
            embed.setTitle(`${upp} - podstawowe statystyki`);
            embed.setDescription(mag['description']);
            embed.addField("Życie",mag['hp'], true);
            embed.addField("Mana",mag['mp'], true);
            embed.addField("Inteligencja",mag['int'], true);
            embed.addField("Witalność",mag['wit'], true);
            embed.addField("Siła",mag['str'], true);
            embed.addField("Zręczność",mag['agil'], true);
            embed.addField("Szczęście",mag['luck'], true);
            embed.addField("Typ walki",mag['att_type'], true);
            message.channel.send(embed).then(msg => msg.delete(20000));
        }
        if (message.content.includes('łucznik')){
            embed.setTitle(`${upp} - podstawowe statystyki`);
            embed.setDescription(łucznik['description']);
            embed.addField("Życie",łucznik['hp'], true);
            embed.addField("Mana",łucznik['mp'], true);
            embed.addField("Inteligencja",łucznik['int'], true);
            embed.addField("Witalność",łucznik['wit'], true);
            embed.addField("Siła",łucznik['str'], true);
            embed.addField("Zręczność",łucznik['agil'], true);
            embed.addField("Szczęście",łucznik['luck'], true);
            embed.addField("Typ walki",łucznik['att_type'], true);
            message.channel.send(embed).then(msg => msg.delete(20000));
        }
        if (message.content.includes('paladyn')){
            embed.setTitle(`${upp} - podstawowe statystyki`);
            embed.setDescription(paladyn['description']);
            embed.addField("Życie",paladyn['hp'], true);
            embed.addField("Mana",paladyn['mp'], true);
            embed.addField("Inteligencja",paladyn['int'], true);
            embed.addField("Witalność",paladyn['wit'], true);
            embed.addField("Siła",paladyn['str'], true);
            embed.addField("Zręczność",paladyn['agil'], true);
            embed.addField("Szczęście",paladyn['luck'], true);
            embed.addField("Typ walki",paladyn['att_type'], true);
            message.channel.send(embed).then(msg => msg.delete(20000));
        }
    }

};


exports.help = {
    name: 'klasa',
    description: '',
    aliases: [],
    usage: '',
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 5 // This should be in seconds
};