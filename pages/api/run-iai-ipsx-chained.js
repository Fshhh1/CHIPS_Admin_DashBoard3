
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nodeId, moduleNames } = req.body;
    let combinedOutput = '';
    moduleNames.forEach((moduleName, index) => {
      combinedOutput += `Step ${index + 1}: ${moduleName} executed successfully. `;
    });
    res.status(200).json({
      nodeId,
      moduleNames,
      result: combinedOutput,
      tokenReward: 100
    });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
