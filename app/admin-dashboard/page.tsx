import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Administrative controls and system monitoring">
      <DashboardOverview />
    </DashboardLayout>
  )
}
