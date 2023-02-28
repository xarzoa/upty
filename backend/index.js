const express = require('express');
const axios = require('axios');
const { Deta } = require('deta');
const config = require('dotenv/config');

const PORT = 8080;

const app = express();
app.use(express.json())

const deta = Deta();

const urls = deta.Base('urls');
const status = deta.Base('status');
const settings = deta.Base('settings');

app.get('/hello', (req,res) => {
  res.status(200).json({ hello: "World"})
})

app.post('/__space/v0/actions', async (req,res) => {
  try{
    await checkStatus()
    res.status(200).json({ message: "Successfully checked."})
    console.info("Successfully checked.")
    res.end()
  }catch(e){
    res.status(200).json({ message: e.message })
    console.error(e.message)
  }
})

async function getURLs() {
  const { items } = await urls.fetch();
  return items;
}

async function getSettings() {
  const settingsData = await settings.get('settings');
  return settingsData;
}

async function updateSettings(setting, data) {
  await settings.update({
    [setting]: data,
  },'settings');
}

async function addSettings() {
  await settings.put({ created_date: new Date() }, 'settings');
}

async function checkStatus() {
  const urls = await getURLs();
  const userSettings = await getSettings();
  if(!userSettings){
    await addSettings()
  }
  const downStrings = [];

  if (urls[0]) {
    for (let i = 0; i < urls.length; i++) {
      const startTime = Date.now()
      const res = await axios.get(urls[i].string, { validateStatus: false });
      const calcTime = Date.now() - startTime
      const date = new Date()
      await status.update(
        {
          status: res.status,
          protocol: res.request.protocol.split(':')[0].toUpperCase(),
          server: res.headers.server,
          encrypted_socket: res.request.socket.encrypted,
          code: res.status,
          checked_method: res.config.method.toUpperCase(),
          message: res.statusText,
          last_checked: date,
          res_time: calcTime
        },
        `${urls[i].key}`
      );

      if (res.status > 399) {
        downStrings.push({
          name: `**${urls[i].name}** is **down**.`,
          value: `\`${urls[i].string}\``,
        });
      }

      console.log(
        `Checked "${
          urls[i].string
        }"! @ ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      );
    }
    if(downStrings.length !== 0){
      await updateSettings("downStrings", downStrings)
    }
  } else {
    console.log(`No monitors!`);
  }
}

app.listen(PORT);