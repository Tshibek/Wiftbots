const { Settings } = require('../models/server/settings');
const { defaultSettings } = require("../settings/defaultSettings");
module.exports = client => {
    const getGuild = async (guild) => {
        let data = await Settings.findOne({guildID: guild.id});
        if (data) return data;
        else return defaultSettings

    };

    const updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings){
            if (settings.hasOwnProperty(key)){
                if (data[key] !== settings[key]) data[key] = settings[key];
                else return;
            }
        }
        return await data.updateOne(settings);
    };

    const createGuild = async (settings) => {

    };


};