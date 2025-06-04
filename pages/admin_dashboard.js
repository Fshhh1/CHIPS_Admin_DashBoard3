
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [quantumLog, setQuantumLog] = useState([]);
  const [maintenanceLog, setMaintenanceLog] = useState([]);
  const [diagnosticsLog, setDiagnosticsLog] = useState([]);
  const [optimizerLog, setOptimizerLog] = useState([]);

  const handleFetch = (url, setLog) => {
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLog((prev) => [...prev, data.message]))
      .catch((error) => setLog((prev) => [...prev, `Error: ${error.message}`]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 23</h1>
        <button onClick={() => handleFetch('/api/quantum-node-scheduling', setQuantumLog)} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Quantum Node Scheduling
        </button>
        <button onClick={() => handleFetch('/api/predictive-maintenance', setMaintenanceLog)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mb-4">
          Predictive Maintenance
        </button>
        <button onClick={() => handleFetch('/api/ai-realtime-diagnostics', setDiagnosticsLog)} className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded mb-4">
          AI Real-Time Diagnostics
        </button>
        <button onClick={() => handleFetch('/api/global-federation-optimizer', setOptimizerLog)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Global Federation Optimizer
        </button>

        <h2 className="text-xl font-bold mt-4">Quantum Node Scheduling Log:</h2>
        <ul>{quantumLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Predictive Maintenance Log:</h2>
        <ul>{maintenanceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI Real-Time Diagnostics Log:</h2>
        <ul>{diagnosticsLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Global Federation Optimizer Log:</h2>
        <ul>{optimizerLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
