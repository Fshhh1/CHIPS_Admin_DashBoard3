
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [governanceLog, setGovernanceLog] = useState([]);
  const [realWorldLog, setRealWorldLog] = useState([]);
  const [blockchainLog, setBlockchainLog] = useState([]);
  const [protocolLog, setProtocolLog] = useState([]);

  const handleFetch = (url, setLog) => {
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLog((prev) => [...prev, data.message]))
      .catch((error) => setLog((prev) => [...prev, `Error: ${error.message}`]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 19</h1>
        <button onClick={() => handleFetch('/api/autonomous-governance', setGovernanceLog)} className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded mb-4">
          Autonomous AI Governance
        </button>
        <button onClick={() => handleFetch('/api/real-world-feed', setRealWorldLog)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Real-World Data Feed
        </button>
        <button onClick={() => handleFetch('/api/blockchain-integration', setBlockchainLog)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Blockchain Integration
        </button>
        <button onClick={() => handleFetch('/api/protocol-expansion', setProtocolLog)} className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded mb-4">
          CHIPS:// Protocol Expansion
        </button>

        <h2 className="text-xl font-bold mt-4">Autonomous Governance Log:</h2>
        <ul>{governanceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Real-World Data Feed Log:</h2>
        <ul>{realWorldLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Blockchain Integration Log:</h2>
        <ul>{blockchainLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Protocol Expansion Log:</h2>
        <ul>{protocolLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
