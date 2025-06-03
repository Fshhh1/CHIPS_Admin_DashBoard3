
export default function handler(req, res) {
  const modules = [
    { id: 1, name: 'core.protocol.chipx', price: 100 },
    { id: 2, name: 'marketplace.module.chipx', price: 150 },
    { id: 3, name: 'developer.tools.chipx', price: 200 },
    { id: 4, name: 'ai.module.chipx', price: 250 }
  ];
  res.status(200).json({ modules });
}
