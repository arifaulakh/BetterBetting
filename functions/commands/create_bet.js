const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
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
* @returns {object}
*/
module.exports = (user, channel, text = 'Unknown Bet', command = {}, botToken = null, callback) => {
    callback(null, {
        text: `<@${user}> created a bet: ${text}`,
        // attachments: [
        // You can customize your messages with attachments.
        // See https://api.slack.com/docs/message-attachments for more info.
        // ]
        attachments: [
            {
                "text": "Choose one option",
                "fallback": "You are unable to participate",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "choose_option",
                        "text": "A",
                        "type": "button",
                        "value": "1"
                    },
                    {
                        "name": "add_option",
                        "text": "Add option",
                        "type": "button",
                        "value": "1"
                    }
                ]
            },
            {
                "label": "Email Address",
                "name": "email",
                "type": "text",
                "subtype": "email",
                "placeholder": "you@example.com"
            }
        ]
    });
};