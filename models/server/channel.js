const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
    channel: String,
    name: String,
    server: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Server'}
    ]
});

module.exports = mongoose.model('Channel', channelSchema);