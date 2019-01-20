const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
/**
* /resend
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
    console.log(`resend in channel ${channel} by user ${user}`)
    lib.utils.kv.get({ key: 'bet_info' }, (err, b) => {
        let a = [];
        for (let i in b) {
            console.log(`Bet with channel equal to ${b[i].channel.id} ${b[i].channel.name} typeof id is ${typeof (b[i].channel.id)}`)
            if (!b[i].dead && b[i].channel.id === channel) {
                a.push({
                    name: 'resend',
                    text: b[i].name,
                    type: 'button',
                    value: i
                })
            }
        }
        console.log(a);
        let x = [];
        for (let i = 0; i < a.length;) {
            let c = [];
            let j = i;
            console.log("c:");
            while (j < a.length && j < i + 5) {
                c.push(a[j])
                console.log(a[j]);
                ++j;
            }
            x.push({
                "fallback": "You are unable to participate",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": c
            })
            i = j;
        }
        callback(null, {
            text: 'Which active bet from your channel do you want to resend?',
            attachments: x
        })
    });
};
