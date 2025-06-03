
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TokenGate() {
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (token === 'GENESIS-CHIPS-TOKEN-001-REDMELON') {
      sessionStorage.setItem('chipsToken', token);
      router.push('/admin_dashboard');
    } else {
      alert('Invalid token.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Token Gate</h1>
        <p className="mb-4">Enter your Genesis Token:</p>
        <input
          className="p-2 rounded text-black mb-4"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </main>
  );
}
