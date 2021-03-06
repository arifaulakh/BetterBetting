const lib = require('lib')({ token: process.env.STDLIB_TOKEN });

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {any}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  lib.utils.kv.clear({ key: 'bet_info' }, (err, val) => {
    if (err) {
      console.log("clear bets err:", err);
    }
    callback(err, 'All bets have been cleared');
  })
};
