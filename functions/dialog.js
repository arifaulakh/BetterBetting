const lib = require('lib')({ token: process.env.STDLIB_TOKEN });

const getBotToken = require('../helpers/get_bot_token.js');
const message = require('../utils/message.js');
// const actions = require('./actions/__main__.js');
// const respond_to_dialog = require('./dialog.js');
/**
 * Slack Dialog (Interactive Messages) Response Handler
 * @bg empty
 * @returns {object}
 */
module.exports = (context, callback) => {

    let params = context.params;
    let dialog;

    // if (params.payload.type !== 'dialog_submission') {
    //     actions(context, callback);
    //     return;
    // }

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
            // Do whatever you want here

            let bet_id;
            lib.utils.storage.get('num_bets', (err, val) => {
                console.log("val = " + val);
                bet_id = val ? val : 0;
                console.log("bet_id = " + bet_id);
            });
            lib.utils.storage.set('num_bets', bet_id + 1, (err) => {console.log(err); });
            let info_array = JSON.parse(submission.bet_options);
            console.log(bet_id);
            console.log(info_array);
            let bet_info = {
                name: submission.bet_name,
                price: submission.bet_price,
                options: []
            };
            let a = [];
            for (let i in info_array) {
                bet_info.options.push({
                    option_name: info_array[i],
                    people: []
                });
                a.push({
                    name: "select_option",
                    text: info_array[i],
                    type: "button",
                    value: {
                        "bet_id": bet_id,
                        "option_index": i
                    }
                });
            }
            console.log(bet_info);
            lib.utils.storage.set('bet_info' + String(bet_id), bet_info, (err) => { });
            let msgobject = {
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
            };
            // msgobject.attachments[0].actions.push({
            //     "name": "newone",
            //     "text": "its new wow",
            //     "type": "button",
            //     "value": `yeinew`
            // });
            message(
                botToken,
                dialog.channel.id,
                //'DIALOG: ' + JSON.stringify(submission),
                msgobject,
                callback
            );
        } else {
            // Do whatever you want here
            if (type == 'interactive_message') {
                var title = dialog.actions[0].name;
                message(
                    botToken,
                    dialog.channel.id,
                    'inbutton ' + JSON.stringify(title),
                    callback
                );
            } else {
                message(
                    botToken,
                    dialog.channel.id,
                    'NOT DIALOG: ' + JSON.stringify(submission),
                    callback
                );
            }
        }

    });

};