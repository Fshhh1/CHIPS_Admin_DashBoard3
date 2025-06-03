
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      sessionStorage.setItem('chipsUser', username);
      alert('Login successful!');
      router.push('/admin_dashboard');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          className="p-2 rounded text-black mb-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded text-black mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </main>
  );
}
