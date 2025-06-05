"use client"

import Link from "next/link"
import { useState } from "react"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@chips.example",
    role: "Administrator",
  })

  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" className="text-blue-600 hover:underline mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold">CHIPS Admin Dashboard</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50"
            >
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline">{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">{user.role}</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Profile Settings</button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Security</button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="border-b border-gray-100 p-4 md:p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="mb-3 text-sm text-gray-600">Use the links below to navigate:</p>
          <ul className="flex flex-wrap gap-4 md:gap-6">
            <li>
              <Link href="/token-gate" className="text-blue-600 hover:underline">
                Token Gate
              </Link>
            </li>
            <li>
              <Link href="/admin-dashboard" className="text-blue-600 hover:underline">
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link href="/chipx-manager" className="text-blue-600 hover:underline">
                chipx Manager
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="text-blue-600 hover:underline">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/developer-portal" className="text-blue-600 hover:underline">
                Developer Portal
              </Link>
            </li>
            <li>
              <Link href="/api-keys" className="text-blue-600 hover:underline font-medium">
                API Key Management
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-200 p-4 md:p-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>CHIPS Admin Dashboard &copy; 2025</p>
          <p className="mt-1">Version 1.0.0 | Last updated: 6/4/2025</p>
        </div>
      </footer>
    </div>
  )
}
