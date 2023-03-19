import { getMonitor } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const monitor = await getMonitor(req.query.id);
    res.status(200).json({ monitor });
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
