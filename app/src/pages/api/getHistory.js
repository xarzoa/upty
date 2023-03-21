import { getHistory } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const history = await getHistory();
    res.status(200).json(history);
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
