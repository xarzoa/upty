import { getStatus, getSettings } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const status = await getStatus();
    const settings = await getSettings()
    res.status(200).json({ status, settings });
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
