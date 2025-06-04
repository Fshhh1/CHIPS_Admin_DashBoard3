import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Triangle, Shield, Database, Network, Code } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <Triangle className="h-16 w-16 fill-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">CHIPS://</h1>
        <p className="text-xl opacity-90">Secure Admin Dashboard & GitHub Integration</p>
        <p className="text-sm opacity-75 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <main className="max-w-4xl mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5" />
                Secure Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-4">Token-based authentication with secure HTTP-only cookies</p>
              <Link href="/token-gate">
                <Button className="w-full" variant="outline">
                  Access Token Gate
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Code className="h-5 w-5" />
                GitHub Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-4">Browse repositories, edit files, and manage your GitHub projects</p>
              <Link href="/api/auth/github">
                <Button className="w-full" variant="outline">
                  Connect GitHub
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5" />
                Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-4">Comprehensive admin tools with real-time monitoring</p>
              <Link href="/admin-dashboard">
                <Button className="w-full" variant="outline">
                  Open Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="h-5 w-5" />
                Debug Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 mb-4">Advanced debugging and system diagnostics</p>
              <Link href="/debug">
                <Button className="w-full" variant="outline">
                  Debug Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Secure Authentication</h3>
              <p className="opacity-80">HTTP-only cookies, no client-side token exposure</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <Database className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Protected Routes</h3>
              <p className="opacity-80">Middleware-based route protection</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <Network className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Secure APIs</h3>
              <p className="opacity-80">Server-side validation and sanitization</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
