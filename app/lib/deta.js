import { Deta } from 'deta';
import { v4 as uuid } from 'uuid';

const deta = Deta(process.env.DETA_KEY);

const urls = deta.Base('urls');
const status = deta.Base('status');
const settings = deta.Base('settings');

async function addURL(url, name) {
  const id = uuid(url);
  await urls.put({ string: url, name: name }, `${id}`);
  await status.put(
    { string: url, name: name, added_date: new Date() },
    `${id}`
  );
}

async function getURLs() {
  const { items } = await urls.fetch();
  return items;
}

async function getStatus() {
  const { items } = await status.fetch();
  return items;
}

async function deleteUrl(id) {
  await urls.delete(id);
  await status.delete(id);
}

async function addSettings() {
  await settings.put({ created_date: new Date() }, 'settings');
}

async function getSettings() {
  const settingsData = await settings.get('settings');
  return settingsData;
}

async function updateSettings(setting, data) {
  const userSettings = await getSettings();
  if(!userSettings){
    await addSettings()
  }
  await settings.update(
    {
      [setting]: data,
      updated_date: new Date(),
    },
    'settings'
  );
}

async function updateStatus(res,key){
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
    },
    `${key}`
  );
}

export { addURL, getURLs, getStatus, deleteUrl, updateSettings, getSettings, updateStatus, addSettings };
