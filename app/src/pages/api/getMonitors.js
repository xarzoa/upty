import { getMonitors, getSettings } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const monitors = await getMonitors();
    res.status(200).json({ monitors });
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
