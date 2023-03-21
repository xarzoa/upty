const { Deta } = require('deta');
const config = require('dotenv/config');
const { historyInt } = require('./history')

const deta = Deta();

const monitors = deta.Base('monitors');
const status = deta.Base('status');
const history = deta.Base('history')
const oldMonitors = deta.Base('urls')

async function getMonitors() {
  const { items } = await monitors.fetch();
  return items;
}

async function updateHistory(code, key, message, name, url){
  let monitor = await history.get(key)

  if(!monitor){
    await history.put({ name, url, key})
  }

  monitor = await history.get(key)

  await history.update(historyInt(code, message, monitor, name, url), key )
}

async function updateMonitor( key, down ){
  await monitors.update({ down: down }, key)
}

async function updateStatus(data, key){
  await status.update(data, key)
}

module.exports = { getMonitors, updateMonitor, updateStatus, updateHistory }