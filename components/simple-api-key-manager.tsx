"use client"

import { useState } from "react"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  expiresAt?: Date
  lastUsed?: Date
  isActive: boolean
  permissions: string[]
}

export function SimpleApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["read"])
  const [expirationDays, setExpirationDays] = useState<number | "">("")
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<string>("")
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info")
  const [filterActive, setFilterActive] = useState<boolean | null>(null)

  const availablePermissions = [
    { id: "read", label: "Read" },
    { id: "write", label: "Write" },
    { id: "delete", label: "Delete" },
    { id: "admin", label: "Admin" },
  ]

  const showMessage = (text: string, type: "success" | "error" | "info" = "info") => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(""), 3000)
  }

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
      showMessage("Please enter a name for the API key", "error")
      return
    }

    if (selectedPermissions.length === 0) {
      showMessage("Please select at least one permission", "error")
      return
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      key: generateApiKey(),
      createdAt: new Date(),
      isActive: true,
      permissions: selectedPermissions,
    }

    // Add expiration if set
    if (expirationDays !== "") {
      const expDate = new Date()
      expDate.setDate(expDate.getDate() + Number(expirationDays))
      newKey.expiresAt = expDate
    }

    setApiKeys((prev) => [...prev, newKey])
    setNewKeyName("")
    setSelectedPermissions(["read"])
    setExpirationDays("")
    showMessage(`API key "${newKey.name}" has been generated successfully`, "success")

    // Show the newly created key
    setVisibleKeys((prev) => {
      const newSet = new Set(prev)
      newSet.add(newKey.id)
      return newSet
    })
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    showMessage("API key copied to clipboard", "success")
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

  const toggleKeyStatus = (keyId: string) => {
    setApiKeys((prev) => prev.map((key) => (key.id === keyId ? { ...key, isActive: !key.isActive } : key)))
    showMessage("API key status updated", "success")
  }

  const revokeApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== keyId))
    showMessage("API key has been revoked", "error")
  }

  const maskApiKey = (key: string) => {
    return key.substring(0, 10) + "•".repeat(20) + key.substring(key.length - 4)
  }

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permission)) {
        return prev.filter((p) => p !== permission)
      } else {
        return [...prev, permission]
      }
    })
  }

  const filteredKeys = apiKeys.filter((key) => {
    if (filterActive === null) return true
    return key.isActive === filterActive
  })

  const isExpired = (key: ApiKey) => {
    return key.expiresAt && new Date() > key.expiresAt
  }

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded ${
            messageType === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : messageType === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          <p>{message}</p>
        </div>
      )}

      {/* Generate New API Key */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Generate New API Key</h3>
        <p className="text-gray-600 mb-4">Create a new API key for accessing CHIPS services</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="keyName" className="block text-sm font-medium mb-2">
              API Key Name
            </label>
            <input
              id="keyName"
              type="text"
              placeholder="e.g., Production App, Development, Mobile App"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Permissions</label>
            <div className="flex flex-wrap gap-3">
              {availablePermissions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                    className="mr-2"
                  />
                  <span>{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="expiration" className="block text-sm font-medium mb-2">
              Expiration (days)
            </label>
            <input
              id="expiration"
              type="number"
              placeholder="No expiration"
              value={expirationDays}
              onChange={(e) => setExpirationDays(e.target.value === "" ? "" : Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty for no expiration</p>
          </div>

          <button
            onClick={createApiKey}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Generate API Key
          </button>
        </div>
      </div>

      {/* Your API Keys */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Your API Keys</h3>
        <p className="text-gray-600 mb-4">
          Manage your existing API keys. Keep them secure and never share them publicly.
        </p>

        {/* Filters */}
        <div className="mb-4 flex items-center gap-4">
          <span className="text-sm font-medium">Filter:</span>
          <button
            onClick={() => setFilterActive(null)}
            className={`px-3 py-1 text-sm rounded ${filterActive === null ? "bg-blue-100 text-blue-800" : "bg-gray-100"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterActive(true)}
            className={`px-3 py-1 text-sm rounded ${filterActive === true ? "bg-blue-100 text-blue-800" : "bg-gray-100"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterActive(false)}
            className={`px-3 py-1 text-sm rounded ${filterActive === false ? "bg-blue-100 text-blue-800" : "bg-gray-100"}`}
          >
            Inactive
          </button>
        </div>

        {filteredKeys.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">No API keys found</p>
            <p className="text-sm">
              {filterActive !== null
                ? `No ${filterActive ? "active" : "inactive"} keys found. Try changing the filter.`
                : "Create your first API key above to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredKeys.map((apiKey) => (
              <div key={apiKey.id} className="border border-gray-100 rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-gray-500">Created {apiKey.createdAt.toLocaleDateString()}</p>
                    {apiKey.expiresAt && (
                      <p className="text-sm text-gray-500">
                        Expires {apiKey.expiresAt.toLocaleDateString()}
                        {isExpired(apiKey) && <span className="text-red-600 ml-1">(Expired)</span>}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        !apiKey.isActive || isExpired(apiKey)
                          ? "bg-gray-100 text-gray-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {!apiKey.isActive ? "Inactive" : isExpired(apiKey) ? "Expired" : "Active"}
                    </span>
                    <button
                      onClick={() => toggleKeyStatus(apiKey.id)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      {apiKey.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-gray-500">API KEY</label>
                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value={visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                      className="flex-1 p-2 border border-gray-300 rounded font-mono text-sm bg-gray-50"
                    />
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      {visibleKeys.has(apiKey.id) ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => revokeApiKey(apiKey.id)}
                      className="px-3 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
                    >
                      Revoke
                    </button>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">PERMISSIONS</label>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((permission) => (
                      <span key={permission} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                {apiKey.lastUsed && (
                  <p className="text-xs text-gray-500 mt-3">Last used: {apiKey.lastUsed.toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Usage Guidelines */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">API Usage Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Keep your API keys secure and never expose them in client-side code</li>
          <li>• Use environment variables to store API keys in your applications</li>
          <li>• Regularly rotate your API keys for enhanced security</li>
          <li>• Monitor API key usage and revoke unused keys</li>
          <li>• Each API key should be used for a specific purpose or application</li>
        </ul>
      </div>
    </div>
  )
}
