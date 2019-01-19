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
            lib.utils.storage.set('num_bets', bet_id + 1, (err) => { });
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
            if (type === 'interactive_message') {
                var title = dialog.actions[0].name;
                message(
                    botToken,
                    dialog.channel.id,
                    'inbutton ' + JSON.stringify(title),
                    callback
                );
                if (title==="select_option"){
                  let flag = false;
                  let voted = false;
                  let val = dialog.actions[0].value;
                  let bet_id = val.bet_id;
                  let option_id = val.option_index;
                  let bet_info;
                  lib.utils.storage.get('bet_info' + String(bet_id),(err,val) => {
                    bet_info = val;
                  });
                  for (let i in bet_info.options){
                    let option = bet_info.options[i];
                    for (let j in option.people){
                      if (option.people[j]==user.id){
                        voted = true;
                        break;
                      }
                    }
                  }
                  if (!voted){
                    for (let i in bet_info.options[option_id].people{
                      if (bet_info.options[option_id].people[i]===user.id)flag = true;
                    }
                    if (!flag){
                      bet_info.options[option_d].people.push(user.id);
                    }
                  }
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
