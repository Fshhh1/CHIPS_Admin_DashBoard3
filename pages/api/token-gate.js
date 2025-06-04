
export default function handler(req, res) {
  const validToken = process.env.GENESIS_TOKEN || 'REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001';

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token === validToken) {
      res.status(200).json({ message: 'Token valid. Access granted.' });
    } else {
      res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
