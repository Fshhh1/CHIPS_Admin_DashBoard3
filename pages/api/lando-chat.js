
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  // Simulate Lando's response (placeholder logic)
  const reply = `Lando says: "${message}" (simulated response)`;

  res.status(200).json({ reply });
}
