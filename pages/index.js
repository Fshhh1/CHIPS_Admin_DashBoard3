
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">CHIPS Admin Dashboard</h1>
        <p className="mb-4">Use the links below to navigate:</p>
        <ul className="space-y-2">
          <li><Link className="underline hover:text-yellow-400" href="/token_gate">Token Gate</Link></li>
          <li><Link className="underline hover:text-yellow-400" href="/admin_dashboard">Admin Dashboard</Link></li>
          <li><Link className="underline hover:text-yellow-400" href="/chipx_manager">.chipx Manager</Link></li>
          <li><Link className="underline hover:text-yellow-400" href="/marketplace">Marketplace</Link></li>
          <li><Link className="underline hover:text-yellow-400" href="/developers">Developer Portal</Link></li>
        </ul>
      </div>
    </main>
  );
}
