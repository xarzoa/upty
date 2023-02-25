import { updateSettings } from '@lib/deta';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.headers.host === process.env.DETA_SPACE_APP_HOSTNAME) {
      await updateSettings(req.body.name, req.body.data);
      res.status(200).json({
        message: 'Settings updated successfully!',
      });
    } else {
      res.status(401).json({
        message: "You're not authorized.",
      });
    }
  } else {
    res.status(502).json({
      message: 'This route only accepts POST reqs!',
    });
  }
}
