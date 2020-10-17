const logger = require('../util/logger');

module.exports = guild => {
    new logger().info(`I was removed from the ${guild.name} guild, which had ${guild.memberCount} members.`);
};