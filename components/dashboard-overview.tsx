"use client"

import { useState, useEffect } from "react"

interface SystemStatus {
  status: "operational" | "degraded" | "outage"
  message: string
  lastUpdated: Date
}

interface SystemMetric {
  name: string
  value: number
  unit: string
  change?: number
}

export function DashboardOverview() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: "operational",
    message: "All systems operational",
    lastUpdated: new Date(),
  })

  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: "API Requests", value: 1245, unit: "req/min", change: 5.2 },
    { name: "Active Users", value: 842, unit: "users", change: 12.7 },
    { name: "Error Rate", value: 0.12, unit: "%", change: -2.3 },
    { name: "Response Time", value: 187, unit: "ms", change: -8.1 },
  ])

  const [recentEvents, setRecentEvents] = useState([
    { id: "1", type: "alert", message: "Unusual traffic detected", timestamp: new Date(Date.now() - 1000 * 60 * 15) },
    { id: "2", type: "info", message: "System update completed", timestamp: new Date(Date.now() - 1000 * 60 * 60) },
    {
      id: "3",
      type: "success",
      message: "New API version deployed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.name === "API Requests" ? Math.floor(metric.value + (Math.random() * 10 - 5)) : metric.value,
          change: metric.name === "API Requests" ? metric.change! + (Math.random() * 0.4 - 0.2) : metric.change,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "outage":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChangeColor = (change: number | undefined) => {
    if (!change) return "text-gray-500"
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`

    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "alert":
        return "⚠️"
      case "info":
        return "ℹ️"
      case "success":
        return "✅"
      default:
        return "•"
    }
  }

  return (
    <div className="space-y-8">
      {/* System Status */}
      <div className="border border-gray-200 rounded p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">System Status</h3>
          <span className={`px-3 py-1 rounded text-sm ${getStatusColor(systemStatus.status)}`}>
            {systemStatus.status.charAt(0).toUpperCase() + systemStatus.status.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 mb-2">{systemStatus.message}</p>
        <p className="text-sm text-gray-500">Last updated: {systemStatus.lastUpdated.toLocaleTimeString()}</p>
      </div>

      {/* Key Metrics */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Key Metrics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="border border-gray-100 rounded p-4">
              <h4 className="text-sm font-medium text-gray-500">{metric.name}</h4>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-2xl font-semibold">{metric.value}</span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
              {metric.change !== undefined && (
                <div className={`text-sm mt-1 ${getChangeColor(metric.change)}`}>
                  {metric.change > 0 ? "↑" : "↓"} {Math.abs(metric.change).toFixed(1)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Recent Events</h3>

        <div className="space-y-3">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3 border-b border-gray-100 pb-3">
              <span className="text-lg">{getEventIcon(event.type)}</span>
              <div>
                <p className="text-gray-800">{event.message}</p>
                <p className="text-xs text-gray-500">{formatTimeAgo(event.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border border-gray-200 rounded p-6">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-3 border border-gray-200 rounded text-left hover:bg-gray-50">
            <h4 className="font-medium">Restart Services</h4>
            <p className="text-sm text-gray-600">Restart all system services</p>
          </button>

          <button className="p-3 border border-gray-200 rounded text-left hover:bg-gray-50">
            <h4 className="font-medium">Clear Cache</h4>
            <p className="text-sm text-gray-600">Clear system cache data</p>
          </button>

          <button className="p-3 border border-gray-200 rounded text-left hover:bg-gray-50">
            <h4 className="font-medium">Run Diagnostics</h4>
            <p className="text-sm text-gray-600">Check system health</p>
          </button>
        </div>
      </div>
    </div>
  )
}
