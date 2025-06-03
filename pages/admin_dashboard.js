
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [chipxResult, setChipxResult] = useState('');
  const [tokenBalance, setTokenBalance] = useState(1000);

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchNodes = async () => {
    const res = await fetch('/api/federation-nodes');
    const data = await res.json();
    setNodes(data.nodes);
  };

  const runChipxModule = async (nodeId, moduleName) => {
    const res = await fetch('/api/run-chipx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodeId, moduleName })
    });
    const data = await res.json();
    setChipxResult(data.result);
    setTokenBalance(prev => prev + 25);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Token Balance: {tokenBalance} tokens</p>
        <h2 className="text-2xl font-bold mt-4 mb-2">Federation Nodes</h2>
        <ul className="mb-4">
          {nodes.map(node => (
            <li key={node.id} className="mb-2 bg-black bg-opacity-30 p-2 rounded">
              Node {node.id}: Status - {node.status}, Health - {node.health}
              <button
                className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded ml-2"
                onClick={() => runChipxModule(node.id, 'sample.module.chipx')}
              >
                Run .chipx Module
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-2">.chipx Module Execution Result:</h2>
        <p className="mb-4">{chipxResult}</p>
        <ul className="space-y-2 mt-4">
          <li><a className="underline hover:text-yellow-400" href="/chipx_manager">.chipx Manager</a></li>
          <li><a className="underline hover:text-yellow-400" href="/marketplace">Marketplace</a></li>
          <li><a className="underline hover:text-yellow-400" href="/developers">Developer Portal</a></li>
          <li><a className="underline hover:text-yellow-400" href="/login">Login</a></li>
          <li><a className="underline hover:text-yellow-400" href="/federation_echo">Federation Echo</a></li>
          <li><a className="underline hover:text-yellow-400" href="/chipx_upload">.chipx Upload</a></li>
        </ul>
      </div>
    </main>
  );
}
