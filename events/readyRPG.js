module.exports = async (client, message) => {
    try {
        if (!message.content.startsWith(prefix))
            ProfilRPG.findOne({
                userID: client.member.id,
                serverID: message.guild.id,
            }, (err, exp) => {
                if (err) console.log(err);
                if (exp) {

                    let nxtLevel = Math.floor(300 + (300 * ((exp.level - 1) * 1.05)));
                    if (exp.exp >= nxtLevel) {
                        let rpg = new RichEmbed()
                            .setColor(color.yellow_dark)
                            .setAuthor(client.member.username, client.member.avatarURL)
                            .setTitle("RPG: Gratulacje")
                            .setThumbnail(client.member.avatarURL)
                            .setDescription("Zdobyłeś poziom!")
                            .setFooter(client.member.tag, client.member.avatarURL);
                        exp.exp = exp.exp - nxtLevel;
                        exp.level = exp.level + 1;
                        exp.save();
                        client.message.channel("523590371243196416").send(rpg).then(msg => msg.delete(10000));
                        
                    }

                }

            });
    } catch (e) {
        console.log(e);

    }
}