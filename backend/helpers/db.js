const { Deta } = require('deta');
const config = require('dotenv/config');

const deta = Deta();

const monitors = deta.Base('monitors');
const status = deta.Base('status');

async function getMonitors() {
  const { items } = await monitors.fetch();
  return items;
}

async function updateMonitor( key, down ){
  await monitors.update({ down: down}, key)
}

async function updateStatus(data, key){
  await status.update(data, key)
}

module.exports = { getMonitors, updateMonitor, updateStatus }