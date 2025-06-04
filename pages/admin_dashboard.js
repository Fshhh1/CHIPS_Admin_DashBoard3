
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [governanceLog, setGovernanceLog] = useState([]);

  useEffect(() => {
    fetch('/api/federation-nodes')
      .then((res) => res.json())
      .then((data) => setNodes(data.nodes));
  }, []);

  const handleCollaborativeAI = () => {
    fetch('/api/collaborative-ai', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  const handleRunChipx = () => {
    fetch('/api/run-chipx-execution', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  const handleGovernance = () => {
    fetch('/api/governance', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setGovernanceLog((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 12</h1>
        <button
          onClick={handleCollaborativeAI}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4"
        >
          Initiate Collaborative AI Execution
        </button>
        <button
          onClick={handleRunChipx}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4"
        >
          Run Real .chipx Module
        </button>
        <button
          onClick={handleGovernance}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4"
        >
          Execute Governance Task
        </button>
        <h2 className="text-2xl font-bold mb-4">Federation Nodes</h2>
        <ul>
          {nodes.map((node) => (
            <li key={node.id} className={`mb-2 p-2 rounded ${node.status === 'online' ? 'bg-green-600' : node.status === 'offline' ? 'bg-gray-600' : 'bg-yellow-600'}`}>
              {node.name} - Status: {node.status}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Governance Log:</h2>
        <ul>
          {governanceLog.map((entry, index) => (
            <li key={index} className="mb-2">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
