import { updateSettings } from '@lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await updateSettings(req.body.name, req.body.data);
    res.status(200).json({
      message: 'Settings updated successfully!',
    });
  } else {
    res.status(502).json({
      message: 'This route only accepts POST reqs!',
    });
  }
}
