
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [blockchainLog, setBlockchainLog] = useState([]);
  const [distributedStatus, setDistributedStatus] = useState([]);

  useEffect(() => {
    fetch('/api/federation-nodes')
      .then((res) => res.json())
      .then((data) => setNodes(data.nodes));
  }, []);

  const handleFederationSynthesis = () => {
    fetch('/api/federation-synthesis', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  const handleBlockchainAnchor = () => {
    fetch('/api/blockchain-anchor', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setBlockchainLog((prev) => [...prev, data.message]));
  };

  const handleDistributedExecution = () => {
    fetch('/api/distributed-execution', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setDistributedStatus((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 13</h1>
        <button
          onClick={handleFederationSynthesis}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4"
        >
          Initiate AI Federation Synthesis
        </button>
        <button
          onClick={handleBlockchainAnchor}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4"
        >
          Anchor .chipx to Blockchain
        </button>
        <button
          onClick={handleDistributedExecution}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4"
        >
          Trigger Distributed Execution
        </button>
        <h2 className="text-2xl font-bold mb-4">Federation Nodes</h2>
        <ul>
          {nodes.map((node) => (
            <li key={node.id} className={`mb-2 p-2 rounded ${node.status === 'online' ? 'bg-green-600' : node.status === 'offline' ? 'bg-gray-600' : 'bg-yellow-600'}`}>
              {node.name} - Status: {node.status}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Blockchain Anchoring Log:</h2>
        <ul>
          {blockchainLog.map((entry, index) => (
            <li key={index} className="mb-2">{entry}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Distributed Execution Status:</h2>
        <ul>
          {distributedStatus.map((entry, index) => (
            <li key={index} className="mb-2">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
