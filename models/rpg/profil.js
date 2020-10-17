const mongoose = require("mongoose");

const profilRpgSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    klasa: String,
    level: Number,
    exp: Number,
    money: Number,
    hp: Number,
    mp: Number,
    int: Number,
    wit: Number,
    str: Number,
    agil: Number,
    luck: Number,
    endur: Number,
    att_type: String,
    bag_size:Number,
    bag: [{
        name: String,
        value: Number,
    }],
    skill: [{
        name: String,
        level: Number,
        exp: Number,
        learn: Number,
    }],
    equip: [{
        name: String,
        level: Number,
        type: String,
        attack: Number,
        magic: Number,
    }],

});


module.exports = mongoose.model('profilRPG', profilRpgSchema);
