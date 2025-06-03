
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nodeId, moduleName } = req.body;
    res.status(200).json({
      nodeId,
      moduleName,
      result: `Simulated execution of ${moduleName} on node ${nodeId} completed successfully.`
    });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
