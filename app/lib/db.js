import { Deta } from 'deta';
import { v4 as uuid } from 'uuid';

const deta = Deta();

const monitors = deta.Base('monitors');
const status = deta.Base('status');

async function addMonitor(data) {
  const id = uuid(data.url);
  await monitors.put({ url: data.url, name: data.name }, `${id}`);
  await status.put(
    { url: data.url, name: data.name, added_date: new Date() },
    `${id}`
  );
}

async function getMonitors() {
  const { items } = await monitors.fetch();
  return items;
}

async function updateMonitor(data,key){
  await monitors.update(
    {
      name: data.name,
      url: data.url,
      webhook: data.webhook,
      updated_date: new Date(),
    },
    key
  );
}

async function getStatus() {
  const { items } = await status.fetch();
  return items;
}

async function deleteMonitor(id) {
  await monitors.delete(id);
  await status.delete(id);
}

async function getMonitor(id){
  const data = await monitors.get(id)
  return data
}


export { addMonitor, getMonitors, getStatus, deleteMonitor, getMonitor, updateMonitor };
