
export default function handler(req, res) {
  const { token } = req.query;
  if (token === 'GENESIS-CHIPS-TOKEN-001-REDMELON') {
    res.status(200).json({ valid: true, message: 'Token valid (secure)' });
  } else {
    res.status(401).json({ valid: false, message: 'Invalid or expired token (secure).' });
  }
}
