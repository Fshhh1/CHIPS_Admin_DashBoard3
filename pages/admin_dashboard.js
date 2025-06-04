
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [securityLog, setSecurityLog] = useState([]);
  const [aiLog, setAILog] = useState([]);
  const [governanceLog, setGovernanceLog] = useState([]);

  const handleFetch = (url, setLog) => {
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLog((prev) => [...prev, data.message]))
      .catch((error) => setLog((prev) => [...prev, `Error: ${error.message}`]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 22</h1>
        <button onClick={() => handleFetch('/api/security-hardened-federation', setSecurityLog)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Security Hardened Federation
        </button>
        <button onClick={() => handleFetch('/api/ai-log-aggregator', setAILog)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          AI Log Aggregator
        </button>
        <button onClick={() => handleFetch('/api/extended-governance', setGovernanceLog)} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded mb-4">
          Extended Governance
        </button>

        <h2 className="text-xl font-bold mt-4">Security Log:</h2>
        <ul>{securityLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI Log:</h2>
        <ul>{aiLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Governance Log:</h2>
        <ul>{governanceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
