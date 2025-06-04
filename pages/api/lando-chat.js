
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    // Simulate Lando's response
    const simulatedResponse = `Lando here! I received: "${message}". How can I assist further?`;
    res.status(200).json({ response: simulatedResponse });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
