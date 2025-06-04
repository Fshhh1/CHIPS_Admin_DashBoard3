
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [smartNodeLog, setSmartNodeLog] = useState([]);
  const [mlTestLog, setMLTestLog] = useState([]);
  const [federatedAnalyticsLog, setFederatedAnalyticsLog] = useState([]);

  const handleFetch = (url, setLog) => {
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLog((prev) => [...prev, data.message]))
      .catch((error) => setLog((prev) => [...prev, `Error: ${error.message}`]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 21</h1>
        <button onClick={() => handleFetch('/api/smart-node-comm', setSmartNodeLog)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Smart Node Communication
        </button>
        <button onClick={() => handleFetch('/api/test-ml-module', setMLTestLog)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          AI/ML Module Test Bench
        </button>
        <button onClick={() => handleFetch('/api/federated-analytics', setFederatedAnalyticsLog)} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded mb-4">
          Federated Analytics
        </button>

        <h2 className="text-xl font-bold mt-4">Smart Node Communication Log:</h2>
        <ul>{smartNodeLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI/ML Module Test Log:</h2>
        <ul>{mlTestLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Federated Analytics Log:</h2>
        <ul>{federatedAnalyticsLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
