
export default function FederationEcho() {
  const nodeStatus = ['Online', 'Maintenance', 'Offline', 'Synching'];
  const randomStatus = nodeStatus[Math.floor(Math.random() * nodeStatus.length)];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Federation Echo Status</h1>
        <p>Node Health: <span className="font-bold">{randomStatus}</span></p>
      </div>
    </main>
  );
}
