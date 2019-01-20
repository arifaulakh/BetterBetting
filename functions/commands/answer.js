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
    lib.utils.storage.get('bet_info', (err, b) => {
        let a = [];
        function f(id) {
            console.log("f " + id);
            if (id >= b.length) {
                callback(null, {
                    text: `List of events`,
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
                let t = b[id].name;
                if (t === undefined) t = "random thing";
                a.push({
                    name: "bet_to_answer",
                    text: t,
                    type: "button",
                    value: id
                });
                f(id + 1);
            }
        }
        f(0);
    });
};
