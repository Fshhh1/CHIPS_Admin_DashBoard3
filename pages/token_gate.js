
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TokenGate() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const validToken = process.env.NEXT_PUBLIC_GENESIS_TOKEN;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token === validToken) {
      sessionStorage.setItem('chipsToken', token);
      router.push('/admin_dashboard');
    } else {
      alert('Invalid token.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Enter Genesis Token</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your Genesis Token"
            className="p-2 rounded w-full text-black mb-4"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
