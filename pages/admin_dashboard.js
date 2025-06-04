
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [orchestrationLog, setOrchestrationLog] = useState([]);
  const [negotiationLog, setNegotiationLog] = useState([]);
  const [tokenEconomicsLog, setTokenEconomicsLog] = useState([]);
  const [conflictLog, setConflictLog] = useState([]);

  const handleDynamicOrchestration = () => {
    fetch('/api/dynamic-orchestration', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setOrchestrationLog((prev) => [...prev, data.message]));
  };

  const handleNodeNegotiation = () => {
    fetch('/api/node-negotiation', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setNegotiationLog((prev) => [...prev, data.message]));
  };

  const handleTokenEconomics = () => {
    fetch('/api/token-economics', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setTokenEconomicsLog((prev) => [...prev, data.message]));
  };

  const handleConflictResolution = () => {
    fetch('/api/federation-conflict', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setConflictLog((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 15</h1>
        <button onClick={handleDynamicOrchestration} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4">
          Start Dynamic Orchestration
        </button>
        <button onClick={handleNodeNegotiation} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Start Node Negotiation
        </button>
        <button onClick={handleTokenEconomics} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Simulate Token Economics
        </button>
        <button onClick={handleConflictResolution} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          Resolve Federation Conflict
        </button>
        <h2 className="text-xl font-bold mt-4">Orchestration Log:</h2>
        <ul>{orchestrationLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Node Negotiation Log:</h2>
        <ul>{negotiationLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Token Economics Log:</h2>
        <ul>{tokenEconomicsLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Federation Conflict Log:</h2>
        <ul>{conflictLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
