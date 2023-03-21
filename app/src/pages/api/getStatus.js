import { getStatus } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const status = await getStatus();
    res.status(200).json(status);
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
