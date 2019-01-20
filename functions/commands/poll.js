const lib = require('lib')({ token: process.env.STDLIB_TOKEN });
/**
* /query_people
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
  console.log(`poll in channel ${channel} by user ${user}`)
  lib.utils.kv.get({ key: 'bet_info' }, (err, b) => {
    let a = [];
    for (let i in b) {
      console.log(`Bet with channel equal to ${b[i].channel.id} ${b[i].channel.name} typeof id is ${typeof (b[i].channel.id)}`)
      if (!b[i].dead && b[i].channel.id === channel) {
        a.push({
          name: 'bet_to_poll',
          text: b[i].name,
          type: 'button',
          value: i
        })
      }
    }
    console.log(a);
    callback(null, {
      text: 'Which active bet from your channel do you want to poll from?',
      attachments: [
        {
          'text': 'Choose one',
          "fallback": "You are unable to participate",
          "callback_id": "wopr_game",
          "attachment_type": "default",
          "color": "#3AA3E3",
          'actions': a
        }
      ]
    })
  });
};
