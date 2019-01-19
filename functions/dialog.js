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
            message(
                botToken,
                dialog.channel.id,
                'DIALOG: ' + JSON.stringify(submission),
                callback
            );
            let bet_id;
            lib.utils.storage.get('num_bets', (err, val) => {
                bet_id = val;
            });
            lib.utils.storage.set('num_bets', bet_id + 1, (err) => { });
            let bet_info = JSON.unparse(submission.bet_options);
            for (var option in bet_info) {
                option.people = [];
            }
            lib.utils.storage.set('bet_info' + String(bet_id), bet_info, (err) => { });
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
            } else { message(
                    botToken,
                    dialog.channel.id,
                    'NOT DIALOG: ' +  JSON.stringify(submission),
                    callback
                );
            }
        }

    });

};