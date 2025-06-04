
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [iaiIpsNodes, setIaiIpsNodes] = useState([]);
  const [iaiIpsResult, setIaiIpsResult] = useState('');
  const [tokenBalance, setTokenBalance] = useState(1000);

  useEffect(() => {
    fetchIaiIpsNodes();
    const interval = setInterval(fetchIaiIpsNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchIaiIpsNodes = async () => {
    const res = await fetch('/api/iai-ips-nodes');
    const data = await res.json();
    setIaiIpsNodes(data.iaiIpsNodes);
  };

  const runIaiIpsxModuleChained = async (nodeId, moduleNames) => {
    const res = await fetch('/api/run-iai-ipsx-chained', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodeId, moduleNames })
    });
    const data = await res.json();
    setIaiIpsResult(data.result);
    setTokenBalance(prev => prev + data.tokenReward);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Token Balance: {tokenBalance} tokens</p>
        <h2 className="text-2xl font-bold mt-4 mb-2">IAI-IPS Nodes</h2>
        <ul className="mb-4">
          {iaiIpsNodes.map(node => (
            <li key={node.id} className="mb-2 bg-black bg-opacity-30 p-2 rounded">
              Node {node.id}: Status - {node.status}, Role - {node.role}, Cognitive Load - {node.cognitiveLoad}, Learning Mode - {node.learningMode}, Evolution Level - {node.evolutionLevel}
              <button
                className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded ml-2"
                onClick={() => runIaiIpsxModuleChained(node.id, ['module1.iai-ipsx', 'module2.iai-ipsx'])}
              >
                Run Chained .iai-ipsx Modules
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-2">.iai-ipsx Chained Execution Result:</h2>
        <p className="mb-4">{iaiIpsResult}</p>
      </div>
    </main>
  );
}
