const logger = require('../util/logger');

module.exports = member => {
    new logger().info(`${member.user.username} dołączyl do serwera ${member.guild.name}.`);
};



