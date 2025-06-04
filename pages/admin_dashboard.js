
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [learningLog, setLearningLog] = useState([]);
  const [synthesisLog, setSynthesisLog] = useState([]);

  useEffect(() => {
    fetch('/api/federation-nodes')
      .then((res) => res.json())
      .then((data) => setNodes(data.nodes));
  }, []);

  const startLearningLoop = () => {
    fetch('/api/ai-learning-loop', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setLearningLog((prev) => [...prev, data.message]));
  };

  const synthesizeChipx = () => {
    fetch('/api/synthesize-chipx', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setSynthesisLog((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard</h1>
        <button
          onClick={startLearningLoop}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4"
        >
          Start AI Learning Loop
        </button>
        <button
          onClick={synthesizeChipx}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4"
        >
          Synthesize .chipx Module
        </button>
        <h2 className="text-2xl font-bold mb-2">Federation Nodes</h2>
        <ul>
          {nodes.map((node) => (
            <li key={node.id} className={`mb-2 p-2 rounded ${node.status === 'online' ? 'bg-green-600' : node.status === 'offline' ? 'bg-gray-600' : 'bg-yellow-600'}`}>
              {node.name} - Status: {node.status}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">AI Learning Loop Log:</h2>
        <ul>
          {learningLog.map((entry, index) => (
            <li key={index} className="mb-2">{entry}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">.chipx Synthesis Log:</h2>
        <ul>
          {synthesisLog.map((entry, index) => (
            <li key={index} className="mb-2">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
