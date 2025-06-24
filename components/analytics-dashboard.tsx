"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  AlertTriangle,
  Settings,
  ChevronDown,
  ChevronRight,
  GripVertical,
} from "lucide-react"
import { analytics } from "../lib/analytics"
import { AdminInterface } from "./admin-interface"

interface PageStats {
  views: number
  submissions: number
  conversionRate: number
}

interface CategoryStats {
  category: any
  pages: Record<string, PageStats>
  totalViews: number
  totalSubmissions: number
  avgConversionRate: number
}

interface ConversionStats {
  categoryStats: Record<string, CategoryStats>
  unknownPages: Record<string, PageStats>
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<ConversionStats | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [draggedPage, setDraggedPage] = useState<{ page: string; fromCategory: string } | null>(null)
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null)

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

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleDragStart = (e: React.DragEvent, page: string, fromCategory: string) => {
    setDraggedPage({ page, fromCategory })
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverCategory(categoryId)
  }

  const handleDragLeave = () => {
    setDragOverCategory(null)
  }

  const handleDrop = (e: React.DragEvent, toCategoryId: string) => {
    e.preventDefault()
    setDragOverCategory(null)

    if (draggedPage && draggedPage.fromCategory !== toCategoryId) {
      const success = analytics.movePageToCategory(draggedPage.page, toCategoryId)
      if (success) {
        refreshStats()
        // Show success feedback
        console.log(`✅ Moved ${draggedPage.page} to ${toCategoryId}`)
      }
    }
    setDraggedPage(null)
  }

  if (showAdmin) {
    return <AdminInterface onClose={() => setShowAdmin(false)} />
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

  // Find best performing page across all categories
  let bestPerforming = { page: "", rate: 0, category: "" }
  Object.entries(stats.categoryStats).forEach(([categoryId, categoryData]) => {
    Object.entries(categoryData.pages).forEach(([page, data]) => {
      if (data.conversionRate > bestPerforming.rate) {
        bestPerforming = { page, rate: data.conversionRate, category: categoryData.category.name }
      }
    })
  })

  const formatPageName = (page: string) => {
    return page
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const unknownPagesCount = Object.keys(stats.unknownPages).length
  const categoriesWithTraffic = Object.entries(stats.categoryStats).filter(([, data]) => data.totalViews > 0)

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[450px] max-h-[500px] overflow-y-auto">
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">🎯 ESS Conversion Tracker</CardTitle>
            <div className="flex items-center space-x-1">
              {unknownPagesCount > 0 && (
                <Button
                  onClick={() => setShowAdmin(true)}
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Admin ({unknownPagesCount})
                </Button>
              )}
              <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
                ✕
              </Button>
            </div>
          </div>
          <CardDescription>Real-time landing page performance by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Best Performer */}
          {bestPerforming.rate > 0 && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-800">
                  🏆 {formatPageName(bestPerforming.page)} is winning!
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                {bestPerforming.rate}% conversion rate in {bestPerforming.category}
              </p>
            </div>
          )}

          {/* Unknown Pages Alert */}
          {unknownPagesCount > 0 && (
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-800">
                    {unknownPagesCount} Unknown Page{unknownPagesCount > 1 ? "s" : ""} Detected
                  </span>
                </div>
                <Button
                  onClick={() => setShowAdmin(true)}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Manage
                </Button>
              </div>
              <p className="text-sm text-amber-700 mt-1">Review and categorize new pages</p>
            </div>
          )}

          {/* Drag and Drop Instructions */}
          {categoriesWithTraffic.length > 1 && (
            <div className="bg-blue-50 p-2 rounded border border-blue-200">
              <p className="text-xs text-blue-700">
                💡 <strong>Tip:</strong> Drag pages between categories to reorganize them!
              </p>
            </div>
          )}

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-700">Landing Pages by Category</h4>
            {categoriesWithTraffic.map(([categoryId, categoryData]) => {
              const isExpanded = expandedCategories.has(categoryId)
              const pagesWithTraffic = Object.entries(categoryData.pages).filter(([, data]) => data.views > 0)
              const isDragOver = dragOverCategory === categoryId

              return (
                <div
                  key={categoryId}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isDragOver ? "border-blue-400 bg-blue-50 shadow-md" : ""
                  }`}
                  onDragOver={(e) => handleDragOver(e, categoryId)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, categoryId)}
                >
                  {/* Category Header */}
                  <div
                    className={`p-3 cursor-pointer hover:bg-gray-50 ${categoryData.category.color.replace("bg-", "border-l-")} border-l-4 ${
                      isDragOver ? "bg-blue-50" : ""
                    }`}
                    onClick={() => toggleCategory(categoryId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-lg">{categoryData.category.icon}</span>
                        <span className="font-semibold">{categoryData.category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {pagesWithTraffic.length} pages
                        </Badge>
                        {isDragOver && <Badge className="bg-blue-500 text-white text-xs">Drop here</Badge>}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{categoryData.avgConversionRate}%</div>
                        <div className="text-xs text-gray-600">
                          {categoryData.totalViews} views • {categoryData.totalSubmissions} leads
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Pages */}
                  {isExpanded && (
                    <div className="bg-gray-50 border-t">
                      {pagesWithTraffic.map(([page, data]) => (
                        <div
                          key={page}
                          draggable
                          onDragStart={(e) => handleDragStart(e, page, categoryId)}
                          className="flex items-center justify-between p-3 border-b last:border-b-0 bg-white mx-2 my-1 rounded cursor-move hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center space-x-2">
                            <GripVertical className="w-3 h-3 text-gray-400" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">{formatPageName(page)}</span>
                                <Badge variant={data.conversionRate > 5 ? "default" : "secondary"} className="text-xs">
                                  {data.conversionRate}%
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600">
                                {data.views} views • {data.submissions} leads
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {data.conversionRate > 5 ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
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
            💡 <strong>Pro Tip:</strong> Click categories to expand and see individual page performance!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
