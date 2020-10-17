const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    user: String,
    discriminator: String,
    server: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Server'}
    ]
});

module.exports = mongoose.model('User', userSchema);
