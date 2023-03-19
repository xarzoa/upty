const axios = require('axios');
const { getMonitors, updateMonitor, updateStatus } = require('./db');

async function checkStatus() {
  const monitors = await getMonitors();

  if (monitors[0]) {
    for (let i = 0; i < monitors.length; i++) {
      try {
        const startTime = Date.now();
        const res = await axios.get(monitors[i].url, { validateStatus: false });
        const calcTime = Date.now() - startTime;
        const date = new Date();
        await updateStatus({
          status: res.status,
          protocol: res.request.protocol.split(':')[0].toUpperCase(),
          server: res.headers.server,
          encrypted_socket: res.request.socket.encrypted,
          code: res.status,
          checked_method: res.config.method.toUpperCase(),
          message: res.statusText,
          last_checked: date,
          res_time: calcTime,
        }, monitors[i].key);

        if (res.status > 399) {
          await updateMonitor(monitors[i].key, true);
        } else {
          await updateMonitor(monitors[i].key, false);
        }
        
        console.log(
          `Checked "${
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

module.exports = { checkStatus };
