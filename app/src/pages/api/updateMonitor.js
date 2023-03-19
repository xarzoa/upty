import { updateMonitor } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await updateMonitor({ name: req.body.name, url: req.body.url, webhook: req.body.webhook },req.body.key );
    res.status(200).json({
      message: 'Monitor updated successfully!',
    });
  } else {
    res.status(502).json({
      message: 'This route only accepts POST reqs!',
    });
  }
}