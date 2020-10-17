const ProfilRPG = require("../../models/rpg/profil");
const color = require("../../settings/colors");
const {RichEmbed} = require('discord.js');
exports.run = async (client, message, args) => {
    await message.delete();
    let win = Math.floor(Math.random() * 10);
    let check = Math.floor(Math.random() * 10);
    let expAdd = Math.floor(Math.random() * 150)+1;
    let boss = Math.floor(Math.random()*100)+1;
    let embed = new RichEmbed()
        .setColor(color.yellow_dark)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setFooter(message.author.tag, message.author.avatarURL);

    ProfilRPG.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, exp) => {
        if (err) console.log(err);
        if (!exp) {
            embed.setDescription("Nie posiadasz konta!");
            embed.addField("Chcesz z nami pograć?", "Wpisz `$rpcreate 'klasa'`",false);
        } else {
            if(exp.endur >= 1){
                let nxtLevel = Math.floor(300 + (300 * ((exp.level-1) * 1.05)));
                embed.setTitle("Walka!");
                if (win >= check){
                    exp.exp = exp.exp+expAdd;

                    embed.setDescription("Wygrałeś!");
                    embed.addField("Zdobyłeś", expAdd+" exp",false);
                }else {
                    embed.setDescription("Przegrałeś!");
                }
                exp.endur = exp.endur-1;

                if(exp.exp >= nxtLevel){
                    let rest = exp.exp-nxtLevel;
                    exp.exp = rest;
                    exp.level = exp.level +1;
                    embed.setDescription("Zdobyłeś poziom!")
                }
                exp.save();
            }else {
                embed.setDescription("Nie posiadasz wystarczająco energi");
            }
        }
        message.channel.send(embed).then(msg => msg.delete(10000));
    });
};


exports.help = {
    name: 'rpdung',
    description: '',
    aliases: [],
    usage: '',
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 180 // This should be in seconds
};