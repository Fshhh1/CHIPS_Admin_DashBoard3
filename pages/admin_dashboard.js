
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [federationStatus, setFederationStatus] = useState('Loading...');
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/federation-echo-stream');
      const data = await res.json();
      setFederationStatus(data.status + ' @ ' + new Date(data.timestamp).toLocaleTimeString());
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAIInsights = async () => {
      const res = await fetch('/api/ai-insights');
      const data = await res.json();
      setAiInsights(data.insights);
    };
    fetchAIInsights();
    const interval = setInterval(fetchAIInsights, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Federation Echo Status: <span className="font-bold">{federationStatus}</span></p>
        <ul className="space-y-2 mt-4">
          <li><a className="underline hover:text-yellow-400" href="/chipx_manager">.chipx Manager</a></li>
          <li><a className="underline hover:text-yellow-400" href="/marketplace">Marketplace</a></li>
          <li><a className="underline hover:text-yellow-400" href="/developers">Developer Portal</a></li>
          <li><a className="underline hover:text-yellow-400" href="/login">Login</a></li>
          <li><a className="underline hover:text-yellow-400" href="/federation_echo">Federation Echo</a></li>
          <li><a className="underline hover:text-yellow-400" href="/chipx_upload">.chipx Upload</a></li>
        </ul>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">AI Insights</h2>
          {aiInsights.map((insight, index) => (
            <div key={index} className="bg-black bg-opacity-30 p-4 rounded mb-2">
              <p><strong>Module:</strong> {insight.module}</p>
              <p><strong>Recommendation:</strong> {insight.recommendation}</p>
              <p><strong>Token Reward:</strong> {insight.tokenReward} tokens</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
