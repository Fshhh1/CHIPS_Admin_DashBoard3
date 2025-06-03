
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [federationStatus, setFederationStatus] = useState('Loading...');

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
      </div>
    </main>
  );
}
