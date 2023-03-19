import { addMonitor } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await addMonitor({ name: req.body.name, url: req.body.url });
    res.status(200).json({
      message: 'Monitor added successfully!',
    });
  } else {
    res.status(502).json({
      message: 'This route only accepts POST reqs!',
    });
  }
}