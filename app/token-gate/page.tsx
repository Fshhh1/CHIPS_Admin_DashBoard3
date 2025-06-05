import { DashboardLayout } from "@/components/dashboard-layout"
import { TokenGateConfig } from "@/components/token-gate-config"

export default function TokenGatePage() {
  return (
    <DashboardLayout title="Token Gate" subtitle="Configure token-gated access controls">
      <TokenGateConfig />
    </DashboardLayout>
  )
}
