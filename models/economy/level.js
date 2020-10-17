const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    level: Number,
    exp: Number,
    allEXP: Number,
});


module.exports = mongoose.model('Level', levelSchema);
