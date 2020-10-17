const ProfilRPG = require("../../models/rpg/profil");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let user = message.mentions.users.first() || message.author;
    let userinfo = {};
    userinfo.id = user.id;
    userinfo.avatar = user.displayAvatarURL;
    userinfo.name = user.username;
    userinfo.discrim = `#${user.discriminator}`;
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setAuthor(userinfo.name, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .setFooter(message.author.tag, message.author.avatarURL);
    ProfilRPG.findOne({
        userID: userinfo.id,
        serverID: message.guild.id,
    }, (err, exp) => {
        if (err) console.log(err);
        if (!exp) {
            embed.setDescription("Nie ma takiego uzytkownika");

        } else {

            let hp = `❤ Życie: \`${exp.hp}\``;
            let mp = `🌀 Mana: \`${exp.mp}\``;

            let power = `⚡ Energia: \`${exp.endur}\``;
            let att_fiz = `Fizyczny: \`${exp.endur}\``;
            let att_mag = `Magiczny: \`${exp.endur}\``;
            let def_fiz = `Fizyczna: \`${exp.endur}\``;
            let def_mag =  `Magiczna: \`${exp.endur}\``;

            let int = `Inteligencja: \`${exp.int}\``;
            let wit = `Witalność: \`${exp.wit}\``;
            let agil = `Zręczność: \`${exp.agil}\``;
            let luck = `Szczęście: \`${exp.luck}\``;
            let str = `Siła: \`${exp.str}\``;
            let nxtLevel = Math.floor(300 + (300 * ((exp.level-1) * 1.05)));

            embed.setDescription(`Klasa: ${exp.klasa.toUpperCase()}\nSpecjalizacja: ${exp.att_type}`);
            embed.setTitle(`Poziom: **${exp.level}**\nExp: ${exp.exp}/${nxtLevel}`);
            embed.addField("Punkty:", `${hp}\n${mp}\n${power}`, false);
            embed.addBlankField(false);
            embed.addField("💰 Skarbiec", `\`${exp.money}\``+" **BZT**", true);
            embed.addField("🔰 Gildia", "**brak**", true);
            embed.addBlankField(false);
            embed.addField("🎽 Ekwipunek", "Użyj komendy `$rpekwipunek`",false);
            embed.addBlankField(false);
            embed.addField("⚔️Atak", `${att_fiz}\n${att_mag}`,true);
            embed.addField("🛡️ Obrona", `${def_fiz}\n${def_mag}`,true);
            embed.addBlankField(false);
            embed.addField("⚙ Statystyki", `${int}\n${wit}\n${agil}\n${luck}\n${str}`,true);
            embed.addField("🛠️ Umiejętności", `${def_fiz}\n${def_mag}`,true);


        }
        message.channel.send(embed).then(msg => msg.delete(10000));
    });


};


exports.help = {
    name: 'rpprofil',
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