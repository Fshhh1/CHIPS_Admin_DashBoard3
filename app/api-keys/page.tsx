import { DashboardLayout } from "@/components/dashboard-layout"
import { SimpleApiKeyManager } from "@/components/simple-api-key-manager"

export default function ApiKeysPage() {
  return (
    <DashboardLayout title="API Key Management" subtitle="Generate and manage API keys for CHIPS services">
      <SimpleApiKeyManager />
    </DashboardLayout>
  )
}
