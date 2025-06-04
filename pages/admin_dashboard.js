
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [marketplaceLog, setMarketplaceLog] = useState([]);
  const [agentUploadLog, setAgentUploadLog] = useState([]);
  const [designLabLog, setDesignLabLog] = useState([]);
  const [realWorldDataLog, setRealWorldDataLog] = useState([]);

  const handleMarketplace = () => {
    fetch('/api/ai-marketplace', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setMarketplaceLog((prev) => [...prev, data.message]));
  };

  const handleAgentUpload = () => {
    fetch('/api/ai-agent-upload', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setAgentUploadLog((prev) => [...prev, data.message]));
  };

  const handleDesignLab = () => {
    fetch('/api/chipx-design-lab', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setDesignLabLog((prev) => [...prev, data.message]));
  };

  const handleRealWorldData = () => {
    fetch('/api/real-world-data', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setRealWorldDataLog((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 16</h1>
        <button onClick={handleMarketplace} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4">
          Access AI Marketplace
        </button>
        <button onClick={handleAgentUpload} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Upload AI Agent
        </button>
        <button onClick={handleDesignLab} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Access .chipx Design Lab
        </button>
        <button onClick={handleRealWorldData} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          Integrate Real-World Data
        </button>
        <h2 className="text-xl font-bold mt-4">AI Marketplace Log:</h2>
        <ul>{marketplaceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI Agent Upload Log:</h2>
        <ul>{agentUploadLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">.chipx Design Lab Log:</h2>
        <ul>{designLabLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Real-World Data Log:</h2>
        <ul>{realWorldDataLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
