const ProfilRPG = require("../../models/rpg/profil");
const klasa = require("../../rpg/class/class");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let user = message.author;

    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setFooter(message.author.tag, message.author.avatarURL);


    ProfilRPG.findOne({
        userID: user.id,
        serverID: message.guild.id,
    }, (err, profil) => {
        if (err) console.log(err);
        if (!profil) {
            embed.setTitle("Gratulacje");
            if (args[0] === 'wojownik' || args[0] === 'mag' || args[0] === 'łucznik' || args[0] === 'paladyn') {
                const newProfile = new ProfilRPG({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    level: 1,
                    exp: 0,
                    money: 100,
                    klasa: args[0].toString(),
                    hp: Number(klasa[args[0]]['hp']),
                    mp: Number(klasa[args[0]]['mp']),
                    int: Number(klasa[args[0]]['int']),
                    wit: Number(klasa[args[0]]['wit']),
                    str: Number(klasa[args[0]]['str']),
                    agil: Number(klasa[args[0]]['agil']),
                    luck: Number(klasa[args[0]]['luck']),
                    endur: 100,
                    att_type: klasa[args[0]]['att_type'],
                });

                embed.setDescription(`Stworzyłeś - ${args[0].toUpperCase()}`);
                newProfile.save().catch(err => console.log(err));

            } else {
                if (args[0]) {
                    embed.setTitle("Przepraszamy");
                    embed.setDescription("Nie ma takiej klasy");

                } else {
                    embed.setTitle("Przepraszamy");
                    embed.setDescription("Musisz podać jaką chcesz klase");
                }

            }
            message.channel.send(embed).then(msg => msg.delete(5000));

        } else {
            embed.setTitle("Przepraszamy");
            embed.setDescription("Posiadasz już konto, nie możesz stworzyć kolejnego");
            message.channel.send(embed).then(msg => msg.delete(10000));
        }
    });
};

exports.help = {
    name: 'rpcreate',
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