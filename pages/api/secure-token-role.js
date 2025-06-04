
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { roleToken } = req.body;
    if (roleToken === process.env.ADMIN_ROLE_TOKEN) {
      res.status(200).json({ message: 'Admin access granted.' });
    } else {
      res.status(401).json({ message: 'Invalid role token.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
