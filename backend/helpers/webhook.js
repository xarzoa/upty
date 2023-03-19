const axios = require('axios');
const { getMonitors } = require('./db')

async function sendNotifications(){
  const monitors = await getMonitors();
  const date = new Date();
  if (monitors[0]) {
    for (let i = 0; i < monitors.length; i++) {
      try {
        if (monitors[i].webhook && monitors[i].url && monitors[i].down) {
          const embeds = {
            title: `:red_square: ${monitors[i].name} **down**.`,
            description: `Your monitor ${monitors[i].url} went down.`,
            fields: [{
              "name": `${monitors[i].name} is down!`,
              "value": `\`${monitors[i].url}\` has returned some error!`
            }],
            footer: {
              text: `Last checked @ ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            },
            url: 'https://deta.space/',
            color: 16711680,
          };
          try {
            await axios.post(
              monitors[i].webhook,
              {
                avatar_url:
                  'https://dl.dropboxusercontent.com/s/6yft5nzylp86yro/upty.png',
                username: 'Upty',
                embeds: [embeds],
              },
              { headers: 'application/json' }
            );
          } catch (e) {
            console.log(e);
          }
        }
        console.log(
          `Notified "${
            monitors[i].url
          }"! @ ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    console.log(`No monitors!`);
  }
}

module.exports = { sendNotifications }