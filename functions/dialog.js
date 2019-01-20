const lib = require('lib')({ token: process.env.STDLIB_TOKEN });

const getBotToken = require('../helpers/get_bot_token.js');
const message = require('../utils/message.js');
// const actions = require('./actions/__main__.js');
// const respond_to_dialog = require('./dialog.js');
/**
 * Slack Dialog (Interactive Messages) Response Handler
 * @bg empty
 * @returns {any}
 */
module.exports = (context, callback) => {

    let params = context.params;
    let dialog;

    if (params.payload) {
        try {
            dialog = JSON.parse(params.payload);
        } catch (err) {
            return callback(err)
        }
    }

    if (!dialog) {
        return callback(null, { error: 'No dialog specified' });
    }

    let type = dialog.type;

    // Use dialog.callback_id to distinguish between different dialogs if you need to

    let user = dialog.user; // Object with username and id
    let channel = dialog.channel; // Object with name and id
    let submission = dialog.submission; // Object with name and value pairs
    let team = dialog.team;

    getBotToken(team.id, (err, botToken) => {
        if (err) {
            callback(err);
        }
        console.log("TYPE is " + type);
        if (type == 'dialog_submission') {
            let info_array = JSON.parse(submission.bet_options);
            // console.log("on just recieved dialog submission bet_id is " + bet_id);
            console.log(" and info array is " + info_array);
            let bet_info = {
                name: submission.bet_name,
                price: submission.bet_price,
                owner: null,
                options: []
            };
            for (let i in info_array) {
                bet_info.options.push({
                    option_name: info_array[i],
                    people: []
                });
            }
            lib.utils.kv.get({ key: 'bet_info' }, (err, b) => {
                if (!b) b = []
                console.log("after getting bet_info we get b:");
                console.log(b);
                num_bets = b.length;
                console.log("numbets = " + num_bets);
                b.push(bet_info);
                lib.utils.kv.set({ key: 'bet_info', value: b }, (err) => {
                    if (err) {
                        console.log("ERR AAAAA " + err);
                    }
                });
                let a = [];
                for (let i in info_array) {
                    a.push({
                        name: "select_option",
                        text: info_array[i],
                        type: "button",
                        value: JSON.stringify({
                            "bet_id": num_bets,
                            "option_index": i
                        })
                    });
                }
                message(
                    botToken,
                    dialog.channel.id,
                    {
                        text: submission.bet_name,
                        attachments: [
                            {
                                "text": "Choose one option",
                                "fallback": "You are unable to participate",
                                "callback_id": "wopr_game",
                                "color": "#3AA3E3",
                                "attachment_type": "default",
                                "actions": a
                            }
                        ]
                    },
                    callback
                );
            });
        } else if (type === 'interactive_message') {
            var title = dialog.actions[0].name;
            if (title === "select_option") {
                console.log("Selecting option");
                lib.utils.kv.get({ key: 'bet_info' }, (err, b) => {
                    let val = JSON.parse(dialog.actions[0].value);
                    let bet_id = val.bet_id;
                    let option_id = val.option_index;
                    console.log("dialog.actions");
                    console.log(dialog.actions);
                    console.log(dialog);
                    console.log("selecting option val=", val, " b = ");
                    console.log(b);
                    let voted = false;
                    for (let i in b[bet_id].options) {
                        let option = b[bet_id].options[i];
                        for (let j in option.people) {
                            if (option.people[j] == user) {
                                voted = true;
                                break;
                            }
                        }
                    }
                    if (!voted) {
                        console.log("Updating b with user ", user.id, " and ", user.name, " from ", b, " to ");
                        b[bet_id].options[option_id].people.push(user);
                        console.log(b);
                        lib.utils.kv.set({ key: 'bet_info', value: b }, (err) => {
                            if (err) {
                                console.log("ERR BBBBBB " + err);
                            }
                        })
                    }
                });
            }
        }
    });
}
