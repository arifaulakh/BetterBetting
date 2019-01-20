const lib = require('lib')({ token: process.env.STDLIB_TOKEN });

// const wrapper = async (num_bets) => {
//   for (let id = 0; id < num_bets; id++) {
//     await lib.utils.storage.clear('bet_info' + String(id));
//   }
// }

// const deleteItems = (num_bets, callback) => {
//   wrapper(num_bets).then(results => {
//     callback(null, results);
//   }).catch(err => {
//     callback(err);
//   })
// }

/**
* /hello
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
  lib.utils.storage.clear('bet_info', (err, val) => {
    if (err) {
      console.log("clear bets err:", err);
    }
  })
  // console.log("HELLO")
  // lib.utils.storage.get('num_bets', (err, val) => {
  //   let num_bets;
  //   if (isNaN(val)) num_bets = 0;
  //   else num_bets = parseInt(val);
  //   console.log("in clear num_bets = " + num_bets + " val = " + val + " typeof val = " + typeof (val));
  //   lib.utils.storage.clear('num_bets', (err, value) => {
  //     console.log("ERROR clear bets value = " + value + " err:");
  //     console.log(err);
  //     deleteItems(num_bets, (err, results) => {
  //       console.log(err, results);
  //       callback(null, {
  //         text: `All deleted`,
  //         attachments: []
  //       });
  //     });
  //   });
  // function f(id) {
  //   console.log("clear id = " + id);
  //   if (id == num_bets) {
  //     callback(null, {
  //       text: `All deleted`,
  //       attachments: []
  //     });
  //   } else {
  //     lib.utils.storage.clear('bet_info' + String(id), (err, value) => {
  //       // if (err) {
  //       //   console.log("ERROR clear bets id = " + id + " err:");
  //       //   console.log(err);
  //       // }
  //       f(id + 1);
  //     });
  //   }
  // }
  // f(0);

  // for (let id = 0; id < num_bets; id++) {
  //   await lib.utils.storage.clear('bet_info' + String(id));
  // }

  // lib.utils.storage.clear('num_bets', (err, value) => {
  //   console.log("ERROR clear bets value = " + value + " err:");
  //   console.log(err);
  // });
  // });
};
