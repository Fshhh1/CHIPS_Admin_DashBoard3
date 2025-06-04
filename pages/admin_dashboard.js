
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [governanceLog, setGovernanceLog] = useState([]);
  const [ethicsLog, setEthicsLog] = useState([]);
  const [tokenLog, setTokenLog] = useState([]);
  const [marketplaceListings, setMarketplaceListings] = useState([]);

  const handleGovernanceVote = () => {
    fetch('/api/federation-governance-vote', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setGovernanceLog((prev) => [...prev, data.message]));
  };

  const handleEthicsToggle = () => {
    fetch('/api/ai-ethics-layer', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setEthicsLog((prev) => [...prev, data.message]));
  };

  const handleTokenRotate = () => {
    fetch('/api/token-rotate', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setTokenLog((prev) => [...prev, data.message]));
  };

  const handleMarketplaceIntegration = () => {
    fetch('/api/marketplace-integration', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setMarketplaceListings((prev) => [...prev, data.message]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 14</h1>
        <button onClick={handleGovernanceVote} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mb-4">
          Cast Governance Vote
        </button>
        <button onClick={handleEthicsToggle} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4">
          Toggle AI Ethics Layer
        </button>
        <button onClick={handleTokenRotate} className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded mb-4">
          Rotate Genesis Token
        </button>
        <button onClick={handleMarketplaceIntegration} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mb-4">
          Integrate .chipx to Marketplace
        </button>
        <h2 className="text-xl font-bold mt-4">Governance Log:</h2>
        <ul>{governanceLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">AI Ethics Log:</h2>
        <ul>{ethicsLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Token Rotation Log:</h2>
        <ul>{tokenLog.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
        <h2 className="text-xl font-bold mt-4">Marketplace Listings:</h2>
        <ul>{marketplaceListings.map((entry, index) => <li key={index} className="mb-2">{entry}</li>)}</ul>
      </div>
    </div>
  );
}
