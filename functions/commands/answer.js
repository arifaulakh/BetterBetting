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
    lib.utils.storage.get('num_bets', (err, val) => {
        let num_bets;
        let a = []
        if (isNaN(val)) num_bets = 0;
        else num_bets = parseInt(val);
        function f(id) {
            console.log("f " + id + " a is ");
            console.log(a);
            if (id == num_bets) {
                console.log("call back\n");
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
                lib.uils.storage.get('bet_info' + String(id), (err, bet_info) => {
                    let t = bet_info.name;
                    if (t === undefined) t = "hello there";
                    a.push({
                        name: "bet_to_answer",
                        text: t,
                        type: "button",
                        value: id
                    });
                    f(id + 1);
                });
            }
        }
        f(0);
        // for (let id = 0; id < num_bets; id++) {
        //     lib.uils.storage.get('bet_info' + String(id), (err, bet_info) => {
        //         a.push({
        //             name: "bet_to_answer",
        //             text: bet_info.name,
        //             type: "button",
        //             value: id
        //         });
        //     });
        // }
    });

    // let msgobject = {
    //     text: "Select your bet",
    //     attachments: [
    //         {
    //             "text": "Choose one option",
    //             "fallback": "You are unable to participate",
    //             "callback_id": "wopr_game",
    //             "color": "#3AA3E3",
    //             "attachment_type": "default",
    //             "actions": a
    //         }
    //     ]
    // };
    // message(
    //     botToken,
    //     dialog.channel.id,
    //     //'DIALOG: ' + JSON.stringify(submission),
    //     msgobject,
    //     callback
    // );
    // let a = [];
    // for (let i in info_array) {
    //     bet_info.options.push({
    //         option_name: info_array[i],
    //         people: []
    //     });
    //     a.push({
    //         name: "select_option",
    //         text: info_array[i],
    //         type: "button",
    //         value: {
    //             "bet_id": bet_id,
    //             "option_index": i
    //         }
    //     });
    // }
    // console.log(bet_info);
    // lib.utils.storage.set('bet_info' + String(bet_id), bet_info, (err) => { });
    // let msgobject = {
    //     text: submission.bet_name,
    //     attachments: [
    //         {
    //             "text": "Choose one option",
    //             "fallback": "You are unable to participate",
    //             "callback_id": "wopr_game",
    //             "color": "#3AA3E3",
    //             "attachment_type": "default",
    //             "actions": a
    //         }
    //     ]
    // };
    // message(
    //     botToken,
    //     dialog.channel.id,
    //     //'DIALOG: ' + JSON.stringify(submission),
    //     msgobject,
    //     callback
    // );
    // callback(null, {
    //     text: `List of events`,
    //     attachments: [
    //         {
    //             "text": "Choose one option",
    //             "fallback": "You are unable to participate",
    //             "callback_id": "answer_1",
    //             "color": "#3AA3E3",
    //             "attachment_type": "default",
    //             "actions": a
    //         }
    //     ]
    // });
};
