import { deleteUrl } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    await deleteUrl(req.body.id);
    res.status(200).json({
      message: 'URL deleted successfully!',
    });
  } else {
    res.status(502).json({
      message: 'This route only accepts DELETE reqs!',
    });
  }
}
