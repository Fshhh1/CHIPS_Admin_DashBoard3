"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Info } from "lucide-react"

export default function TokenGate() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hint, setHint] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setHint("")

    try {
      const response = await fetch("/api/auth/token-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin-dashboard")
      } else {
        setError(data.message || "Invalid token")
        if (data.hint) {
          setHint(data.hint)
        }
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // For development/demo purposes - pre-fill with default token
  const fillDefaultToken = () => {
    setToken("REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold">CHIPS:// Security Gate</CardTitle>
          <p className="text-gray-600">Enter your Genesis Token to access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm font-medium">
                Genesis Token
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter your Genesis Token"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {hint && (
              <Alert>
                <Info className="h-4 w-4 mr-2" />
                <AlertDescription>{hint}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading || !token.trim()}>
              {loading ? "Verifying..." : "Access Dashboard"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={fillDefaultToken}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Use default token (for demo)
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure token-based authentication</p>
            <p className="mt-1">Contact admin for Genesis Token access</p>
            <p className="mt-3 text-xs bg-gray-100 p-2 rounded">
              Default token: REDMELON-IAIIPS-CHIPS-GENESIS-TOKEN-001
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
