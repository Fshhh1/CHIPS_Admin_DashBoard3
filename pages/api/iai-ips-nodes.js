
let iaiIpsNodes = [
  { id: 1, status: 'Active', role: 'Analytics', cognitiveLoad: 'Medium' },
  { id: 2, status: 'Idle', role: 'Defense', cognitiveLoad: 'Low' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ iaiIpsNodes });
  } else if (req.method === 'POST') {
    const { id, status, role, cognitiveLoad } = req.body;
    iaiIpsNodes.push({ id, status, role, cognitiveLoad });
    res.status(201).json({ message: 'IAI-IPS Node added successfully.', iaiIpsNodes });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    iaiIpsNodes = iaiIpsNodes.filter(node => node.id !== id);
    res.status(200).json({ message: 'IAI-IPS Node deleted successfully.', iaiIpsNodes });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
