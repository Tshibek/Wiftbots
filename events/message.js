// This will be used for the cooldowns
const {Collection} = require('discord.js');



module.exports = message => {
    const client = message.client;

    // If the author of the message is a bot or the message doesn't start with the prefix we cancel the execution
    if (message.author.bot || message.content.indexOf(client.config.prefix) !== 0) return;

    // Here, we split the message into different "arguments" at one or more spaces.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    // We remove the first "argument", which is the command itself
    const command = args.shift().toLowerCase();

    let cmd;
    // If the thing that "stores" the commands has the command then set the cmd to the command.
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        // If the thing that "stores" the command aliases has the command then set the cmd to the command.
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }

    // If the command exists in the "store" and it was sucessfully set above then this will run

    if (cmd) {

        /* 
        This will handle the cooldowns
        This cooldown part was 99% inspired from discordjs.guide, credits to them :D
        */
        if (!client.cooldowns.has(cmd.help.name)) {
            client.cooldowns.set(cmd.help.name, new Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(cmd.help.name);
        const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;

        if (!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            // If the cooldown didn't expire and the message author is not the bot owner
            if (now < expirationTime && message.author.id !== client.config.owner) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`${message.author}: You should chill down for ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.help.name}\` command.`);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        // If the command is not enabled cancel the execution
        if (!cmd.conf.enabled) return message.channel.send('This command is currently disabled.');

        // If the command can only be used in a "guild" and the command wasn't sent in one, cancel the execution
        if (cmd.conf.guildOnly && message.channel.type !== 'text') return message.channel.send('This command can only be used in guilds.');

        // If the command can only be used by the bot owner and a different person tries to run it the execution will be canceled
        if (cmd.conf.ownerOnly && message.author.id !== client.config.owner) return message.channel.send('This command can only be used by my owner.');

        // We trie executing the command, and if it errors we'll send the "error" itself to the channel the "command" was used in
        try {
            cmd.run(client, message, args)
        } catch (err) {
            message.channel.send(`Something went wrong...\n\`\`\`${err}\`\`\``);
        }

    }


};