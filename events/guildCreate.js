const logger = require('../util/logger');

module.exports = guild => {
    new logger().info(`I was added in the ${guild.name} guild, which has ${guild.memberCount} members.`);
};