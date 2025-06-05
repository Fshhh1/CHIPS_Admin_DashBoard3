import { DashboardLayout } from "@/components/dashboard-layout"

export default function MarketplacePage() {
  return (
    <DashboardLayout title="Marketplace" subtitle="Manage marketplace listings and transactions">
      <div className="space-y-6">
        <div className="border border-gray-200 rounded p-6">
          <h3 className="text-lg font-medium mb-4">Marketplace Management</h3>
          <p className="text-gray-600 mb-4">Oversee marketplace activities and manage listings.</p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Marketplace functionality coming soon...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
