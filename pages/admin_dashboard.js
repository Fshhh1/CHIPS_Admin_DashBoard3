
export default function AdminDashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Federation Echo Status: All Nodes Online (Simulated)</p>
        <p>Invite Tokens Issued: 5</p>
        <p>Rogue Detection: None Detected.</p>
        <ul className="space-y-2 mt-4">
          <li><a className="underline hover:text-yellow-400" href="/chipx_manager">.chipx Manager</a></li>
          <li><a className="underline hover:text-yellow-400" href="/marketplace">Marketplace</a></li>
          <li><a className="underline hover:text-yellow-400" href="/developers">Developer Portal</a></li>
        </ul>
      </div>
    </main>
  );
}
