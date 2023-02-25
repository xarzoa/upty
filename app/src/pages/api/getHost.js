export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ headers: req.headers });
  } else {
    res.status(502).json({
      message: 'This route only accepts GET reqs!',
    });
  }
}
