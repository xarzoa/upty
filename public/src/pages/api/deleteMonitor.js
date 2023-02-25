import { deleteUrl } from '@lib/deta';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    if (req.headers.host === process.env.DETA_SPACE_APP_HOSTNAME) {
      await deleteUrl(req.body.id);
      res.status(200).json({
        message: 'URL deleted successfully!',
      });
    } else {
      res.status(401).json({
        message: "You're not authorized.",
      });
    }
  } else {
    res.status(502).json({
      message: 'This route only accepts DELETE reqs!',
    });
  }
}
