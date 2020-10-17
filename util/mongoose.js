const mongoose = require('mongoose');
module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            family: 4
        };
        mongoose.connect('mongodb://localhost:27017/wiftbot', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
           console.log("Połaczenie mongoose zostało otwarte");
        });
        mongoose.connection.on('err', err => {
            console.log(`Mongoose polaczenie error:\n${err.stack}`);
        });
        mongoose.connection.on('disconnected', () => {
            console.log("Rozłaczenie z mongoose");
        });

    }
};