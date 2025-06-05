"use client"

import type React from "react"

import { useState } from "react"

interface TokenRule {
  id: string
  name: string
  tokenAddress: string
  minAmount: number
  maxAmount?: number
  isActive: boolean
}

export function TokenGateConfig() {
  const [tokenRules, setTokenRules] = useState<TokenRule[]>([
    {
      id: "1",
      name: "Basic Access",
      tokenAddress: "0x1234...5678",
      minAmount: 1,
      isActive: true,
    },
    {
      id: "2",
      name: "Premium Access",
      tokenAddress: "0x8765...4321",
      minAmount: 10,
      maxAmount: 100,
      isActive: true,
    },
  ])

  const [newRule, setNewRule] = useState<Partial<TokenRule>>({
    name: "",
    tokenAddress: "",
    minAmount: 1,
    isActive: true,
  })

  const [message, setMessage] = useState<string>("")
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info")

  const showMessage = (text: string, type: "success" | "error" | "info" = "info") => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setNewRule((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const addTokenRule = () => {
    if (!newRule.name || !newRule.tokenAddress || newRule.minAmount === undefined) {
      showMessage("Please fill in all required fields", "error")
      return
    }

    const rule: TokenRule = {
      id: Date.now().toString(),
      name: newRule.name,
      tokenAddress: newRule.tokenAddress,
      minAmount: newRule.minAmount,
      maxAmount: newRule.maxAmount,
      isActive: newRule.isActive ?? true,
    }

    setTokenRules((prev) => [...prev, rule])
    setNewRule({
      name: "",
      tokenAddress: "",
      minAmount: 1,
      isActive: true,
    })

    showMessage(`Token rule "${rule.name}" has been added`, "success")
  }

  const toggleRuleStatus = (id: string) => {
    setTokenRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)))
    showMessage("Token rule status updated", "success")
  }

  const deleteRule = (id: string) => {
    setTokenRules((prev) => prev.filter((rule) => rule.id !== id))
    showMessage("Token rule has been deleted", "error")
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

      {/* Add New Token Rule */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Add New Token Rule</h3>
        <p className="text-gray-600 mb-4">Configure token requirements for access control</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Rule Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Basic Access, Premium Tier"
              value={newRule.name || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tokenAddress" className="block text-sm font-medium mb-2">
              Token Contract Address
            </label>
            <input
              id="tokenAddress"
              name="tokenAddress"
              type="text"
              placeholder="0x..."
              value={newRule.tokenAddress || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minAmount" className="block text-sm font-medium mb-2">
                Minimum Amount
              </label>
              <input
                id="minAmount"
                name="minAmount"
                type="number"
                min="0"
                step="0.01"
                value={newRule.minAmount || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="maxAmount" className="block text-sm font-medium mb-2">
                Maximum Amount (Optional)
              </label>
              <input
                id="maxAmount"
                name="maxAmount"
                type="number"
                min="0"
                step="0.01"
                value={newRule.maxAmount || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={addTokenRule}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add Token Rule
          </button>
        </div>
      </div>

      {/* Existing Token Rules */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Token Rules</h3>
        <p className="text-gray-600 mb-4">Manage existing token rules for access control</p>

        {tokenRules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">No token rules configured</p>
            <p className="text-sm">Add your first token rule above to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tokenRules.map((rule) => (
              <div key={rule.id} className="border border-gray-100 rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm font-mono text-gray-500">{rule.tokenAddress}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        rule.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {rule.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => toggleRuleStatus(rule.id)}
                      className="text-xs px-2 py-1 border border-gray-200 rounded hover:bg-gray-50"
                    >
                      {rule.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Min:</span> {rule.minAmount} tokens
                      </p>
                      {rule.maxAmount && (
                        <p className="text-sm">
                          <span className="font-medium">Max:</span> {rule.maxAmount} tokens
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Token Gate Settings */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Token Gate Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-100 rounded">
            <div>
              <h4 className="font-medium">Enable Token Gating</h4>
              <p className="text-sm text-gray-600">Restrict access based on token ownership</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-100 rounded">
            <div>
              <h4 className="font-medium">Require Signature Verification</h4>
              <p className="text-sm text-gray-600">Users must sign a message to verify ownership</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-100 rounded">
            <div>
              <h4 className="font-medium">Cache Token Verification</h4>
              <p className="text-sm text-gray-600">Store verification results to reduce blockchain queries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
