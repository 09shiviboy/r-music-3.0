const chalk = require('chalk');
const figlet = require("figlet");

module.exports = async function(client) {
    console.log(chalk.yellow.bold(figlet.textSync("Rise")));
    await console.log(chalk.red.bold(client.user.tag) + chalk.blue.bold(" Is Ready"));

    await client.user.setActivity(require('../../../config/bot').prefix + "help | 🎆 Happy New Year 2022");
    await client.user.setStatus("online");
}