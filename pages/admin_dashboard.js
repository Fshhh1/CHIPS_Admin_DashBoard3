
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    fetch('/api/federation-nodes')
      .then((res) => res.json())
      .then((data) => setNodes(data.nodes));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('chipsToken');
    window.location.href = '/token_gate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard</h1>
        <p className="mb-4">Genesis Token: {process.env.NEXT_PUBLIC_GENESIS_TOKEN}</p>
        <p className="mb-4">Token Balance: {balance} ChipX</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-6"
        >
          Logout
        </button>
        <h2 className="text-2xl font-bold mb-4">Federation Nodes</h2>
        <ul>
          {nodes.map((node) => (
            <li key={node.id} className={`mb-2 p-2 rounded ${node.status === 'online' ? 'bg-green-600' : node.status === 'offline' ? 'bg-gray-600' : 'bg-yellow-600'}`}>
              {node.name} - Status: {node.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
