const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
/**
* /bet_options
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
    var txt = text.split("; ");
    var betName = txt[0];
    var ans = txt[1];
    callback(null, {
        text: `<@${user}> says ${ans} is the answer for ${betName}`,
        attachments: [
            {
                "text": "Choose one option",
                "fallback": "You are unable to participate",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "bet_options",
                        "text": "Add Option",
                        "type": "button",
                        "value": `add_${betName}`
                    },
                    {
                        "name": "bet_options",
                        "text": "Remove Option",
                        "type": "button",
                        "value": `remove_${betName}`
                    },
                    
                ]
            }
        ]
    });
};
