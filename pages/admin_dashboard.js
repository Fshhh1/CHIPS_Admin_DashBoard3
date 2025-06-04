
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [tokenLog, setTokenLog] = useState([]);
  const [federationLog, setFederationLog] = useState([]);
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
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 20</h1>
        <button onClick={() => handleFetch('/api/token-economy', setTokenLog)} className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded mb-4">
          Token Economy & Licensing
        </button>
        <button onClick={() => handleFetch('/api/federation-upgrade', setFederationLog)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Federation Upgrade
        </button>
        <button onClick={() => handleFetch('/api/universal-governance', setGovernanceLog)} className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded mb-4">
          Universal Governance API
        </button>

        <h2 className="text-xl font-bold mt-4">Token Economy Log:</h2>
        <ul>{tokenLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Federation Upgrade Log:</h2>
        <ul>{federationLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Universal Governance Log:</h2>
        <ul>{governanceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
