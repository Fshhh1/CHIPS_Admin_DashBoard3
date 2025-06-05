"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Eye, EyeOff, Key, Plus, Trash2 } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  lastUsed?: Date
  isActive: boolean
}

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<{
    title: string
    message: string
    type: "success" | "error"
  } | null>(null)

  const generateApiKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = "chips_"
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const createApiKey = () => {
    if (!newKeyName.trim()) {
      setToastMessage({
        title: "Error",
        message: "Please enter a name for the API key",
        type: "error",
      })
      setTimeout(() => setToastMessage(null), 3000)
      return
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      key: generateApiKey(),
      createdAt: new Date(),
      isActive: true,
    }

    setApiKeys((prev) => [...prev, newKey])
    setNewKeyName("")

    setToastMessage({
      title: "Success",
      message: `API key "${newKey.name}" has been generated successfully`,
      type: "success",
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    setToastMessage({
      title: "Copied",
      message: "API key copied to clipboard",
      type: "success",
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(keyId)) {
        newSet.delete(keyId)
      } else {
        newSet.add(keyId)
      }
      return newSet
    })
  }

  const revokeApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId))
    setToastMessage({
      title: "Revoked",
      message: "The API key has been permanently deleted",
      type: "error",
    })
    setTimeout(() => setToastMessage(null), 3000)
  }

  const maskApiKey = (key: string) => {
    return key.substring(0, 10) + "•".repeat(20) + key.substring(key.length - 4)
  }

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
            toastMessage.type === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
          } border z-50`}
        >
          <h4 className="font-medium">{toastMessage.title}</h4>
          <p className="text-sm">{toastMessage.message}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Generate New API Key
          </CardTitle>
          <CardDescription>Create a new API key for accessing CHIPS services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyName">API Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g., Production App, Development, Mobile App"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <Button onClick={createApiKey} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Generate API Key
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage your existing API keys. Keep them secure and never share them publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No API keys generated yet</p>
              <p className="text-sm">Create your first API key above to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <p className="text-sm text-muted-foreground">Created {apiKey.createdAt.toLocaleDateString()}</p>
                    </div>
                    <Badge variant={apiKey.isActive ? "default" : "secondary"}>
                      {apiKey.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">API KEY</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                        {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => revokeApiKey(apiKey.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {apiKey.lastUsed && (
                    <p className="text-xs text-muted-foreground">Last used: {apiKey.lastUsed.toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Keep your API keys secure and never expose them in client-side code</p>
          <p>• Use environment variables to store API keys in your applications</p>
          <p>• Regularly rotate your API keys for enhanced security</p>
          <p>• Monitor API key usage and revoke unused keys</p>
          <p>• Each API key should be used for a specific purpose or application</p>
        </CardContent>
      </Card>
    </div>
  )
}
