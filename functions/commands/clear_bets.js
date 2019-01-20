const lib = require('lib')({token: process.env.STDLIB_TOKEN});
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
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
    lib.utils.storage.get('num_bets', (err, val) => {
        let num_bets;
        if (isNaN(val)) num_bets = 0;
        else num_bets = parseInt(val);
        for(let id=0; id<num_bets; id++){
            lib.utils.storage.clear('bet_info' + String(id), (err, value) => {
                
            });
        }
    });

  callback(null, {
    text: `All deleted`,
    attachments: [
      // You can customize your messages with attachments.
      // See https://api.slack.com/docs/message-attachments for more info.
    ]
  });
};
