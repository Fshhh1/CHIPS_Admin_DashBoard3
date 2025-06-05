import { DashboardLayout } from "@/components/dashboard-layout"

export default function DeveloperPortalPage() {
  return (
    <DashboardLayout title="Developer Portal" subtitle="Access developer tools and documentation">
      <div className="space-y-6">
        <div className="border border-gray-200 rounded p-6">
          <h3 className="text-lg font-medium mb-4">Developer Resources</h3>
          <p className="text-gray-600 mb-4">Access APIs, documentation, and development tools.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded p-4">
              <h4 className="font-medium mb-2">API Documentation</h4>
              <p className="text-sm text-gray-600 mb-3">Complete API reference and guides</p>
              <button className="text-blue-600 hover:underline text-sm">View Docs →</button>
            </div>

            <div className="border border-gray-100 rounded p-4">
              <h4 className="font-medium mb-2">SDK Downloads</h4>
              <p className="text-sm text-gray-600 mb-3">Official SDKs for various platforms</p>
              <button className="text-blue-600 hover:underline text-sm">Download →</button>
            </div>

            <div className="border border-gray-100 rounded p-4">
              <h4 className="font-medium mb-2">Code Examples</h4>
              <p className="text-sm text-gray-600 mb-3">Sample code and integration examples</p>
              <button className="text-blue-600 hover:underline text-sm">Browse →</button>
            </div>

            <div className="border border-gray-100 rounded p-4">
              <h4 className="font-medium mb-2">Support</h4>
              <p className="text-sm text-gray-600 mb-3">Get help with development questions</p>
              <button className="text-blue-600 hover:underline text-sm">Contact →</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
