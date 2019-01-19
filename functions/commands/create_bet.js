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
* @returns {object}
*/
module.exports = (user, channel, text = 'Unknown Bet', command = {}, botToken = null, callback) => {
    getBotToken(command.team_id, (err, botToken) => {
        if (err) {
            callback(err);
        }
        openDialog(botToken, command.trigger_id, {
            callback_id: 'schedule_dialog',
            title: 'Request a Ride',
            submit_label: 'Request',
            elements: [
                {
                    label: 'Choose a building',
                    type: 'select',
                    name: 'building',
                    options: [
                        {
                            label: 'WPP',
                            value: 'wpp'
                        }
                    ]
                }
            ]
        }, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, {});
        })
    });
    /*
        dialog({
            trigger_id: command.trigger_id,
            token: command.token,
            channel: {
                id: command.channel_id,
                name: command.channel_name
            },
            user: {
                id: command.user_id,
                name: command.user_name
            },
            callback_id: "create_bet_dialog",
            actions: [
                {
                    "name": "channels_list",
                    "selected_options": [
                        {
                            "value": "C012AB3CD"
                        }
                    ]
                }
            ]
        }, callback);
        */
    /*
        callback(null, {
            // text: `<@${user}> created a bet: ${text}`,
    
            text: JSON.stringify(command),
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
                }
            ]
        });
        */
};