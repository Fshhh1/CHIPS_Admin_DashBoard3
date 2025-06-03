
let nodes = [
  { id: 1, status: 'Online', health: 'Good' },
  { id: 2, status: 'Maintenance', health: 'Fair' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ nodes });
  } else if (req.method === 'POST') {
    const { id, status, health } = req.body;
    nodes.push({ id, status, health });
    res.status(201).json({ message: 'Node added successfully.', nodes });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    nodes = nodes.filter(node => node.id !== id);
    res.status(200).json({ message: 'Node deleted successfully.', nodes });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
