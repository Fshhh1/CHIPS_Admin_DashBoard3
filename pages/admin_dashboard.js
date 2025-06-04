
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [validatorLog, setValidatorLog] = useState([]);
  const [tokenBridgeLog, setTokenBridgeLog] = useState([]);
  const [clusteringLog, setClusteringLog] = useState([]);
  const [ecosystemLog, setEcosystemLog] = useState([]);

  const handleValidatorNetwork = () => {
    fetch('/api/validator-network', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setValidatorLog((prev) => [...prev, data.message]));
  };

  const handleTokenBridge = () => {
    fetch('/api/token-bridge', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setTokenBridgeLog((prev) => [...prev, data.message]));
  };

  const handleAgentClustering = () => {
    fetch('/api/agent-clustering', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setClusteringLog((prev) => [...prev, data.message]));
  };

  const handleAIEcosystem = () => {
    fetch('/api/ai-ecosystem', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setEcosystemLog((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 17</h1>
        <button onClick={handleValidatorNetwork} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4">
          Deploy Validator Network
        </button>
        <button onClick={handleTokenBridge} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Bridge Tokens (Simulated)
        </button>
        <button onClick={handleAgentClustering} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Execute Agent Clustering
        </button>
        <button onClick={handleAIEcosystem} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          Visualize AI Ecosystem
        </button>
        <h2 className="text-xl font-bold mt-4">Validator Network Log:</h2>
        <ul>{validatorLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Token Bridge Log:</h2>
        <ul>{tokenBridgeLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Agent Clustering Log:</h2>
        <ul>{clusteringLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI Ecosystem Log:</h2>
        <ul>{ecosystemLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
