"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Triangle, GitBranch, Folder, RefreshCw } from "lucide-react"
import { RepoSelector } from "@/components/repo-selector"
import { FileViewer } from "@/components/file-viewer"
import { DebugBanner } from "@/components/debug-banner"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  updated_at: string
  html_url: string
  _fetched_at?: string
}

export default function Dashboard() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFetch, setLastFetch] = useState<string | null>(null)

  useEffect(() => {
    fetchRepos()
  }, [])

  const fetchRepos = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const url = forceRefresh ? "/api/github/repos?refresh=true&t=" + Date.now() : "/api/github/repos"

      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }

      const data = await response.json()
      setRepos(data)
      setLastFetch(new Date().toISOString())
      localStorage.setItem("lastGitHubSync", new Date().toISOString())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p>Loading your repositories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => fetchRepos(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Link href="/debug">
              <Button variant="outline">Debug</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DebugBanner />

      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Triangle className="h-6 w-6 fill-black" />
            <h1 className="text-xl font-semibold">CHIPS:// Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span>{repos.length} repositories</span>
              {lastFetch && <span className="ml-2">• Last sync: {new Date(lastFetch).toLocaleTimeString()}</span>}
            </div>
            <Button onClick={() => fetchRepos(true)} disabled={refreshing} size="sm" variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Syncing..." : "Sync"}
            </Button>
            <Link href="/debug">
              <Button variant="outline" size="sm">
                Debug
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Your Repositories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RepoSelector repos={repos} selectedRepo={selectedRepo} onSelectRepo={setSelectedRepo} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedRepo ? (
              <FileViewer repo={selectedRepo} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-gray-500">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a repository to view its contents</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
