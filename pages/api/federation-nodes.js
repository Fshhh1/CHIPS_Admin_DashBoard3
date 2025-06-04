
export default function handler(req, res) {
  const federationNodes = [
    { id: 1, name: 'Node-Alpha', status: 'online' },
    { id: 2, name: 'Node-Beta', status: 'offline' },
    { id: 3, name: 'Node-Gamma', status: 'degraded' },
  ];
  res.status(200).json({
    message: 'Federation nodes fetched successfully.',
    nodes: federationNodes,
    timestamp: new Date().toISOString()
  });
}
