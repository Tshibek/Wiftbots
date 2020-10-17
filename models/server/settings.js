const mongoose = require('mongoose');
const settingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    guildOwnerID: String,
    prefix: String,
    welcomeChannel: String,
    welcomeMessage: String,
    staffRoles: [{role: String}]

});
module.exports = mongoose.model('Settings', settingsSchema);