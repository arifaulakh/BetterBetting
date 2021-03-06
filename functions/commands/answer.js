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
    lib.utils.kv.get({ key: 'bet_info' }, (err, b) => {
        console.log("In answer.js b:", b, " type = ", typeof (b), " user ", user);
        if (!b) b = [];
        let a = [];
        function f(id) {
            console.log("f " + id);
            if (id >= b.length) {
                console.log("After answer a is:");
                console.log(a);
                callback(null, {
                    text: `List of bets`,
                    attachments: [
                        {
                            "text": "Choose one option",
                            "fallback": "You are unable to participate",
                            "callback_id": "answer_1",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "actions": a
                        }
                    ]
                });
            } else {
                if (!b[id].dead && b[id].owner.id === user && b[id].channel.id === channel) {
                    a.push({
                        name: "bet_to_answer",
                        text: b[id].name,
                        type: "button",
                        value: id
                    });
                }
                f(id + 1);
            }
        }
        f(0);
    });
};
