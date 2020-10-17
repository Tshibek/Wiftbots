const color = require("../settings/colors");
const config = require("../config");
const {RichEmbed} = require('discord.js');
const Level = require("../models/economy/level");
const Money = require("../models/economy/money");
const ProfilRPG = require("../models/rpg/profil");
const sleep = require('system-sleep');
module.exports = async message => {
    const prefix = config.prefix;
    try {
        if (message.content.includes("https://discord") && message.author.id !==  "485198837535997962"){
            await message.delete(1);
            let discord = new RichEmbed()
                .setTitle("Ostrzeżenie")
                .setColor(color.yellow_dark)
                .setDescription("Zaproszenia są wyłączone na tym serwerze!");
            message.channel.send(discord).then(msg => msg.delete(3000));
        }
        if (message.content.includes("www.discord") && message.author.id !==  "485198837535997962"){
            await message.delete(1);
            let discord = new RichEmbed()
                .setTitle("Ostrzeżenie")
                .setColor(color.yellow_dark)
                .setDescription("Zaproszenia są wyłączone na tym serwerze!");
            message.channel.send(discord).then(msg => msg.delete(3000));
        }
        if (message.content.includes("http://discord") && message.author.id !==  "485198837535997962"){
            await message.delete(1);
            let discord = new RichEmbed()
                .setTitle("Ostrzeżenie")
                .setColor(color.yellow_dark)
                .setDescription("Zaproszenia są wyłączone na tym serwerze!");
            message.channel.send(discord).then(msg => msg.delete(3000));
        }
        if (message.content.includes("https://www.discord") && message.author.id !==  "485198837535997962"){
            await message.delete(1);
            let discord = new RichEmbed()
                .setTitle("Ostrzeżenie")
                .setColor(color.yellow_dark)
                .setDescription("Zaproszenia są wyłączone na tym serwerze!");
            message.channel.send(discord).then(msg => msg.delete(3000));
        }
        if (message.content.includes("http://www.discord") && message.author.id !==  "485198837535997962"){
            await message.delete(1);
            let discord = new RichEmbed()
                .setTitle("Ostrzeżenie")
                .setColor(color.yellow_dark)
                .setDescription("Zaproszenia są wyłączone na tym serwerze!");
            message.channel.send(discord).then(msg => msg.delete(3000));
        }
    } catch (e) {
        await message.delete(0);
        console.log(e);
    }
    //RPG level UP




    if (message.content.startsWith(prefix)) return;
    if (!message.content.startsWith(prefix) && message.author.id !==  "485198837535997962") {
        Level.findOne({
            userID: message.author.id,
            serverID:message.guild.id,

        }, (err, exp) => {
            if (err) console.log(err);
            let expAdd = Math.floor(Math.random() * 25) + 10;

            if (!exp) {
                const newLevel = new Level({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    level: 1,
                    exp: 300-expAdd,
                    allEXP: expAdd,
                });
                newLevel.save().catch(err => console.log(err));
            } else {
                let nxtLevel = Math.floor(300 + (300 * ((exp.level-1) * 1.05)));
                exp.exp = exp.exp-expAdd;
                exp.allEXP = exp.allEXP + expAdd;
                if (nxtLevel <= exp.allEXP) {
                    exp.exp = nxtLevel-expAdd;
                    exp.level = exp.level + 1;
                    let lvlup = new RichEmbed()
                        .setTitle("Zdobyłeś poziom!")
                        .setColor(color.yellow_dark)
                        .setAuthor(message.author.username)
                        .addField("Nowy poziom", exp.level,false);

                    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
                }

                exp.save();
                }

            Money.findOne({
                userID: message.author.id,
                serverID:message.guild.id,

            }, (err, money) => {
                if (err) console.log(err);
                let moneyAdd = Math.floor(Math.random() * 10) + 1;
                if (!money) {
                    const newMoney = new Money({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        money:10+moneyAdd,
                    });
                    newMoney.save().catch(err => console.log(err));
                } else {
                    let nxtLevel = Math.floor(300 + (300 * ((exp.level-1) * 1.05)));
                    let nxtMoney = Math.floor(10 + (10 * ((exp.level-1) / 2)));
                    money.money =  money.money + moneyAdd;
                    if (nxtLevel <= exp.allEXP) {
                        money.money = money.money + nxtMoney;

                    }

                    money.save();
                }

            }); //Loop end for members
        }); //Loop end for members



    }

};



