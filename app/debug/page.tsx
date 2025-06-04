"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, CheckCircle, XCircle, GitBranch } from "lucide-react"

interface DebugInfo {
  timestamp: string
  vercelDeployment: any
  githubConnection: any
  environmentVars: any
  apiStatus: any
  cacheStatus: any
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug/diagnostics")
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      console.error("Debug diagnostics failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const forceRefresh = async () => {
    setRefreshing(true)
    try {
      await fetch("/api/debug/force-refresh", { method: "POST" })
      await runDiagnostics()
    } catch (error) {
      console.error("Force refresh failed:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const clearCache = async () => {
    try {
      await fetch("/api/debug/clear-cache", { method: "POST" })
      await runDiagnostics()
    } catch (error) {
      console.error("Clear cache failed:", error)
    }
  }

  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center gap-2">
      {status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
      <span className="text-sm">{label}</span>
      <Badge variant={status ? "default" : "destructive"}>{status ? "OK" : "ERROR"}</Badge>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p>Running diagnostics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">CHIPS:// Debug Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={runDiagnostics} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Diagnostics
            </Button>
            <Button onClick={forceRefresh} disabled={refreshing}>
              <GitBranch className="h-4 w-4 mr-2" />
              {refreshing ? "Refreshing..." : "Force Sync"}
            </Button>
            <Button onClick={clearCache} variant="outline">
              Clear Cache
            </Button>
          </div>
        </div>

        {debugInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatusIndicator status={debugInfo.githubConnection?.connected} label="GitHub Connection" />
                <StatusIndicator status={debugInfo.environmentVars?.valid} label="Environment Variables" />
                <StatusIndicator status={debugInfo.apiStatus?.healthy} label="API Health" />
                <StatusIndicator status={debugInfo.vercelDeployment?.synced} label="Deployment Sync" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong>Last Deploy:</strong> {debugInfo.vercelDeployment?.lastDeploy || "Unknown"}
                </div>
                <div className="text-sm">
                  <strong>Git SHA:</strong> {debugInfo.vercelDeployment?.gitSha || "Unknown"}
                </div>
                <div className="text-sm">
                  <strong>Branch:</strong> {debugInfo.vercelDeployment?.branch || "Unknown"}
                </div>
                <div className="text-sm">
                  <strong>Environment:</strong> {debugInfo.vercelDeployment?.environment || "Unknown"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong>OAuth Status:</strong>
                  <Badge variant={debugInfo.githubConnection?.oauthValid ? "default" : "destructive"} className="ml-2">
                    {debugInfo.githubConnection?.oauthValid ? "Valid" : "Invalid"}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong>API Rate Limit:</strong> {debugInfo.githubConnection?.rateLimit || "Unknown"}
                </div>
                <div className="text-sm">
                  <strong>Last Sync:</strong> {debugInfo.githubConnection?.lastSync || "Never"}
                </div>
                <div className="text-sm">
                  <strong>Webhook Status:</strong>
                  <Badge variant={debugInfo.githubConnection?.webhookActive ? "default" : "secondary"} className="ml-2">
                    {debugInfo.githubConnection?.webhookActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong>Repository Cache:</strong>
                  <Badge variant={debugInfo.cacheStatus?.repoCache ? "default" : "secondary"} className="ml-2">
                    {debugInfo.cacheStatus?.repoCache ? "Active" : "Cleared"}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong>File Cache:</strong>
                  <Badge variant={debugInfo.cacheStatus?.fileCache ? "default" : "secondary"} className="ml-2">
                    {debugInfo.cacheStatus?.fileCache ? "Active" : "Cleared"}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong>Last Cache Clear:</strong> {debugInfo.cacheStatus?.lastClear || "Never"}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Debug Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={() => (window.location.href = "/api/debug/test-github")} variant="outline">
                Test GitHub API
              </Button>
              <Button onClick={() => (window.location.href = "/api/debug/verify-webhook")} variant="outline">
                Verify Webhooks
              </Button>
              <Button onClick={() => (window.location.href = "/api/debug/check-deployment")} variant="outline">
                Check Deployment
              </Button>
            </div>
          </CardContent>
        </Card>

        {debugInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Raw Debug Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
