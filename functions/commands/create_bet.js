const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
const getBotToken = require('../../helpers/get_bot_token.js');
const openDialog = require('../../utils/open_dialog.js');
/**
* /create_bet
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
module.exports = (user, channel, text = 'Unknown Bet', command = {}, botToken = null, callback) => {
    getBotToken(command.team_id, (err, botToken) => {
        if (err) {
            callback(err);
        }
        openDialog(botToken, command.trigger_id, {
            callback_id: 'create_bet_dialog',
            title: 'Create a Bet',
            submit_label: 'Submit',
            elements: [
                {
                    "type": "text",
                    "label": "Bet",
                    "name": "bet_name"
                },
                {
                    "type": "text",
                    "label": "Price",
                    "name": "bet_price"
                },
                {
                    "type": "textarea",
                    "label": "Options",
                    "name": "bet_options",
                    "hint": "Enter options in json format as array."
                }
            ]
        }, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, {});
        })
    });
};
