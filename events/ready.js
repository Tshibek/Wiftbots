const logger = require('../util/logger');

module.exports = client => {
    new logger().info(`Successfully logged in as ${client.user.tag}! Ready to serve ${client.guilds.size} ${client.guilds.size <= 1 ? 'server' : 'servers'} with a total of ${client.users.size} users.`);
};