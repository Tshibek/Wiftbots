const logger = require('../util/logger');

module.exports = member => {
    new logger().info(`${member.user.username} odszedł od serwera ${member.guild.name}.`);
};