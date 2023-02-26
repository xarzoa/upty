import { getSettings, addSettings } from '@lib/db';
import axios from 'axios';

async function sendNotifications() {
  const userSettings = await getSettings();
  if (!userSettings) {
    await addSettings();
  }

  if (userSettings.webhook && userSettings.downStrings.length !== 0) {
    const date = new Date();
    const embeds = {
      title: `:red_square:  Some services are **down**.`,
      description: `Your monitor your some services went down. Here's some details.`,
      fields: userSettings.downStrings,
      footer: {
        text: `Last checked @ ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      },
      url: 'https://deta.space/',
      color: 16711680,
    };
    try {
      await axios.post(
        userSettings.webhook,
        {
          avatar_url:
            'https://dl.dropboxusercontent.com/s/6yft5nzylp86yro/upty.png',
          username: 'Upty',
          embeds: [embeds],
        },
        { headers: 'application/json' }
      );
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await sendNotifications();
    res.status(200).json({ message: 'Success.' });
  } else {
    res.status(502).json({
      message: 'This route only accepts POST reqs!',
    });
  }
}
