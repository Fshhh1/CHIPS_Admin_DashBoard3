"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, X } from "lucide-react"
import Link from "next/link"

export function DebugBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)

  useEffect(() => {
    // Check if we're in development or if there are sync issues
    const isDev = process.env.NODE_ENV === "development"
    const lastSyncTime = localStorage.getItem("lastGitHubSync")

    if (isDev || !lastSyncTime) {
      setShowBanner(true)
    }

    setLastSync(lastSyncTime)
  }, [])

  if (!showBanner) return null

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertTriangle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong>Debug Mode:</strong> GitHub sync issues detected.
          {lastSync && <span className="ml-2">Last sync: {new Date(lastSync).toLocaleString()}</span>}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/debug">
            <Button size="sm" variant="outline">
              Debug Dashboard
            </Button>
          </Link>
          <Button size="sm" variant="ghost" onClick={() => setShowBanner(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
