"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Triangle, Shield, LogOut, Activity, Database, Network } from "lucide-react"
import { LandoChat } from "@/components/lando-chat"

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    try {
      const response = await fetch("/api/auth/verify")
      if (response.ok) {
        setAuthenticated(true)
      } else {
        router.push("/token-gate")
      }
    } catch (error) {
      router.push("/token-gate")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect to token gate
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white">
      <header className="bg-black bg-opacity-20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Triangle className="h-8 w-8 fill-white" />
            <h1 className="text-2xl font-bold">CHIPS:// Admin Dashboard</h1>
            <Badge variant="secondary">Phase 26</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-white border-white">
              <Shield className="h-3 w-3 mr-1" />
              Authenticated
            </Badge>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Federation Nodes</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <div className="flex justify-between">
                  <span>AI Modules</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Security</span>
                  <Badge variant="default">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5" />
                Module Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Modules</span>
                  <span>24</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Deployed</span>
                  <span>127</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="h-5 w-5" />
                Network Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Uptime</span>
                  <span>99.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency</span>
                  <span>12ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Throughput</span>
                  <span>1.2k/s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Deploy New Module
              </Button>
              <Button className="w-full" variant="outline">
                Run Diagnostics
              </Button>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
              <Button className="w-full" variant="outline">
                Manage Federation
              </Button>
            </CardContent>
          </Card>

          <div>
            <LandoChat />
          </div>
        </div>
      </main>
    </div>
  )
}
