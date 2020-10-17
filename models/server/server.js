const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    server: String,
    name: String
});
module.exports = mongoose.model('Server', serverSchema);