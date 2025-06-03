
export default function handler(req, res) {
  const statuses = ['Online', 'Maintenance', 'Offline', 'Synching'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  res.status(200).json({ status: randomStatus, timestamp: new Date().toISOString() });
}
