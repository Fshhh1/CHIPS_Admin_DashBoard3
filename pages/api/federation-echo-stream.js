
export default function handler(req, res) {
  res.status(200).json({
    echo: 'Federation Echo Node Active',
    timestamp: new Date().toISOString()
  });
}
