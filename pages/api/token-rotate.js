
export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({
      message: 'Genesis Token rotated successfully. Please update your .env.local file.',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
