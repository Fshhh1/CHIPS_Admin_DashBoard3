import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">CHIPS Admin Dashboard</h1>

      <p className="mb-4">Use the links below to navigate:</p>

      <ul className="space-y-2 mb-8">
        <li>
          <Link href="/token-gate" className="text-blue-600 hover:underline">
            Token Gate
          </Link>
        </li>
        <li>
          <Link href="/admin-dashboard" className="text-blue-600 hover:underline">
            Admin Dashboard
          </Link>
        </li>
        <li>
          <Link href="/chipx-manager" className="text-blue-600 hover:underline">
            chipx Manager
          </Link>
        </li>
        <li>
          <Link href="/marketplace" className="text-blue-600 hover:underline">
            Marketplace
          </Link>
        </li>
        <li>
          <Link href="/developer-portal" className="text-blue-600 hover:underline">
            Developer Portal
          </Link>
        </li>
        <li>
          <Link href="/api-keys" className="text-blue-600 hover:underline">
            API Key Management
          </Link>
        </li>
      </ul>

      <div className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/api-keys"
            className="block p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium mb-2">Generate API Keys</h3>
            <p className="text-sm text-gray-600">Create and manage API keys for CHIPS services</p>
          </Link>

          <Link
            href="/token-gate"
            className="block p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium mb-2">Token Gate</h3>
            <p className="text-sm text-gray-600">Manage token-gated access controls</p>
          </Link>

          <Link
            href="/developer-portal"
            className="block p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium mb-2">Developer Portal</h3>
            <p className="text-sm text-gray-600">Access developer tools and documentation</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
