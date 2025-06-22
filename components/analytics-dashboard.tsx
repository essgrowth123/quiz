"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Download, RefreshCw } from "lucide-react"
import { analytics } from "../lib/analytics"

interface ConversionStats {
  "blue-collar": { views: number; submissions: number; conversionRate: number }
  ford: { views: number; submissions: number; conversionRate: number }
  limo: { views: number; submissions: number; conversionRate: number }
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<ConversionStats | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const refreshStats = () => {
    const newStats = analytics.getConversionStats()
    setStats(newStats)
  }

  useEffect(() => {
    refreshStats()
  }, [])

  const exportData = () => {
    const data = analytics.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ess-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white"
        size="sm"
      >
        📊 Analytics
      </Button>
    )
  }

  if (!stats) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4">
        <p>Loading analytics...</p>
      </div>
    )
  }

  const bestPerforming = Object.entries(stats).reduce(
    (best, [page, data]) => {
      return data.conversionRate > best.rate ? { page, rate: data.conversionRate } : best
    },
    { page: "", rate: 0 },
  )

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-96 overflow-y-auto">
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">🎯 ESS Conversion Tracker</CardTitle>
            <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
              ✕
            </Button>
          </div>
          <CardDescription>Real-time landing page performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Best Performer */}
          {bestPerforming.rate > 0 && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800">
                  🏆 {bestPerforming.page.charAt(0).toUpperCase() + bestPerforming.page.slice(1)} is winning!
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">{bestPerforming.rate}% conversion rate</p>
            </div>
          )}

          {/* Page Stats */}
          <div className="space-y-3">
            {Object.entries(stats).map(([page, data]) => (
              <div key={page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium capitalize">
                      {page === "blue-collar" ? "🔧 Blue-Collar" : page === "ford" ? "🚗 Ford" : "🚗 Limo"}
                    </span>
                    <Badge variant={data.conversionRate > 5 ? "default" : "secondary"}>{data.conversionRate}%</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {data.views} views • {data.submissions} leads
                  </p>
                </div>
                <div className="text-right">
                  {data.conversionRate > 5 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button onClick={refreshStats} variant="outline" size="sm" className="flex-1">
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <Button onClick={exportData} variant="outline" size="sm" className="flex-1">
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>

          {/* Quick Insights */}
          <div className="text-xs text-gray-500 pt-2 border-t">
            💡 <strong>Pro Tip:</strong> Focus ad spend on your highest converting page!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
