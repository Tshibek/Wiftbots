// We use moment to get a pretty date output
const moment = require('moment');

// This logger was actually made by me, and I'm pretty proud of it to be honest.
class logger {
    constructor() {}

    error(data) {
        const date = moment(new Date()).format('LLL');
        return console.log("\x1b[31m", `[${date}] (${require.main.filename}) - ${data}`)
    }

    info(data) {
        const date = moment(new Date()).format('LLL');
        return console.log("\x1b[33m", `[${date}] (${require.main.filename}) - ${data}`)
    }

    normal(data) {
        const date = moment(new Date()).format('LLL');
        return console.log("\x1b[37m", `[${date}] (${require.main.filename}) - ${data}`)
    }
}

module.exports = logger;