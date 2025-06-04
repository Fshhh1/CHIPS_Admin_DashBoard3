"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bug, RefreshCw, Key, Cookie, Database, Server } from "lucide-react"

export default function DebugPage() {
  const [tokenInput, setTokenInput] = useState("REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001")
  const [tokenStatus, setTokenStatus] = useState<"idle" | "testing" | "valid" | "invalid">("idle")
  const [cookieStatus, setCookieStatus] = useState<"checking" | "found" | "not-found">("checking")
  const [systemInfo, setSystemInfo] = useState({
    nextVersion: "Loading...",
    nodeVersion: "Loading...",
    environment: "Loading...",
  })
  const [message, setMessage] = useState("")

  useEffect(() => {
    checkAuthCookie()
    getSystemInfo()
  }, [])

  const checkAuthCookie = async () => {
    setCookieStatus("checking")
    try {
      const response = await fetch("/api/auth/verify")
      if (response.ok) {
        setCookieStatus("found")
      } else {
        setCookieStatus("not-found")
      }
    } catch (error) {
      setCookieStatus("not-found")
      console.error("Cookie check error:", error)
    }
  }

  const getSystemInfo = () => {
    setSystemInfo({
      nextVersion: "14.0.0",
      nodeVersion: process.env.NODE_ENV || "development",
      environment: typeof window !== "undefined" ? window.location.hostname : "server",
    })
  }

  const testToken = async () => {
    setTokenStatus("testing")
    try {
      const response = await fetch("/api/auth/token-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenInput }),
      })

      const data = await response.json()

      if (data.success) {
        setTokenStatus("valid")
        setMessage("Token is valid! Authentication successful.")
      } else {
        setTokenStatus("invalid")
        setMessage(`Token validation failed: ${data.message}`)
      }
    } catch (error) {
      setTokenStatus("invalid")
      setMessage("Error testing token: Network or server error")
      console.error("Token test error:", error)
    }
  }

  const clearAuthCookie = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setMessage("Authentication cookie cleared successfully")
      checkAuthCookie()
    } catch (error) {
      setMessage("Error clearing authentication cookie")
      console.error("Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold">CHIPS:// Debug Dashboard</h1>
          </div>
          <p className="text-gray-600">Troubleshooting and system diagnostics</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Token Validator
              </CardTitle>
              <CardDescription>Test Genesis Token validation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Enter Genesis Token to test"
                  />
                  <Button onClick={testToken} disabled={tokenStatus === "testing"}>
                    {tokenStatus === "testing" ? "Testing..." : "Test"}
                  </Button>
                </div>

                {tokenStatus !== "idle" && (
                  <div className="flex items-center gap-2">
                    <span>Status:</span>
                    {tokenStatus === "testing" && <Badge className="bg-blue-500">Testing...</Badge>}
                    {tokenStatus === "valid" && <Badge className="bg-green-500">Valid</Badge>}
                    {tokenStatus === "invalid" && <Badge className="bg-red-500">Invalid</Badge>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Authentication Status
              </CardTitle>
              <CardDescription>Check and manage authentication cookies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auth Cookie:</span>
                  <div>
                    {cookieStatus === "checking" && <Badge className="bg-blue-500">Checking...</Badge>}
                    {cookieStatus === "found" && <Badge className="bg-green-500">Found</Badge>}
                    {cookieStatus === "not-found" && <Badge className="bg-red-500">Not Found</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={checkAuthCookie} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button onClick={clearAuthCookie} variant="outline" size="sm">
                    Clear Cookie
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Information
            </CardTitle>
            <CardDescription>Environment and version details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500 mb-1">Next.js Version</div>
                <div className="font-medium">{systemInfo.nextVersion}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500 mb-1">Environment</div>
                <div className="font-medium">{systemInfo.nodeVersion}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500 mb-1">Hostname</div>
                <div className="font-medium">{systemInfo.environment}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Valid Tokens (For Testing)
            </CardTitle>
            <CardDescription>These tokens can be used to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded border font-mono text-sm">
                REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001
              </div>
              <div className="p-2 bg-gray-50 rounded border font-mono text-sm">GENESIS-CHIPS-TOKEN-001-REDMELON</div>
              <div className="p-2 bg-gray-50 rounded border font-mono text-sm">REDMELON-GENESIS-TOKEN-001</div>
              <div className="p-2 bg-gray-50 rounded border font-mono text-sm">admin123</div>
            </div>
          </CardContent>
        </Card>

        {message && (
          <Alert className="mt-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
