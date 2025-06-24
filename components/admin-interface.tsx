"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, Settings, ArrowLeft, FolderPlus, FileText, Copy, Eye } from "lucide-react"
import { analytics, type PageCategory, type CategoryTemplate } from "../lib/analytics"

interface PageStats {
  views: number
  submissions: number
  conversionRate: number
}

interface ConversionStats {
  categoryStats: Record<string, any>
  unknownPages: Record<string, PageStats>
}

interface AdminInterfaceProps {
  onClose: () => void
}

export function AdminInterface({ onClose }: AdminInterfaceProps) {
  const [stats, setStats] = useState<ConversionStats | null>(null)
  const [categories, setCategories] = useState<PageCategory[]>([])
  const [templates, setTemplates] = useState<CategoryTemplate[]>([])
  const [promotedPages, setPromotedPages] = useState<Set<string>>(new Set())
  const [dismissedPages, setDismissedPages] = useState<Set<string>>(new Set())
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<CategoryTemplate | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string>("")

  // New Category Form
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryIcon, setNewCategoryIcon] = useState("📄")
  const [newCategoryColor, setNewCategoryColor] = useState("bg-gray-500")

  // New Template Form
  const [newTemplate, setNewTemplate] = useState({
    categoryId: "",
    name: "",
    description: "",
    heroTitle: "",
    heroSubtitle: "",
    ctaText: "",
    features: ["", "", "", "", ""],
    testimonialText: "",
    testimonialAuthor: "",
    colorScheme: {
      primary: "blue-600",
      secondary: "blue-100",
      accent: "orange-500",
    },
  })

  const refreshStats = () => {
    const newStats = analytics.getConversionStats()
    const newCategories = analytics.getCategories()
    const newTemplates = analytics.getTemplates()
    setStats(newStats)
    setCategories(newCategories)
    setTemplates(newTemplates)
  }

  useEffect(() => {
    refreshStats()
    // Load promoted/dismissed pages from localStorage
    const stored = localStorage.getItem("ess_admin_actions")
    if (stored) {
      try {
        const { promoted, dismissed } = JSON.parse(stored)
        setPromotedPages(new Set(promoted || []))
        setDismissedPages(new Set(dismissed || []))
      } catch (e) {
        console.warn("Failed to load admin actions:", e)
      }
    }
  }, [])

  const saveAdminActions = (promoted: Set<string>, dismissed: Set<string>) => {
    localStorage.setItem(
      "ess_admin_actions",
      JSON.stringify({
        promoted: Array.from(promoted),
        dismissed: Array.from(dismissed),
      }),
    )
  }

  const promotePage = (pageName: string, categoryId: string) => {
    const newPromoted = new Set(promotedPages)
    newPromoted.add(pageName)
    setPromotedPages(newPromoted)

    // Remove from dismissed if it was there
    const newDismissed = new Set(dismissedPages)
    newDismissed.delete(pageName)
    setDismissedPages(newDismissed)

    saveAdminActions(newPromoted, newDismissed)

    // Add to analytics known pages with category
    analytics.promotePageToKnown(pageName, categoryId)
    refreshStats()
  }

  const dismissPage = (pageName: string) => {
    const newDismissed = new Set(dismissedPages)
    newDismissed.add(pageName)
    setDismissedPages(newDismissed)

    // Remove from promoted if it was there
    const newPromoted = new Set(promotedPages)
    newPromoted.delete(pageName)
    setPromotedPages(newPromoted)

    saveAdminActions(newPromoted, newDismissed)
  }

  const undoAction = (pageName: string) => {
    const newPromoted = new Set(promotedPages)
    const newDismissed = new Set(dismissedPages)

    newPromoted.delete(pageName)
    newDismissed.delete(pageName)

    setPromotedPages(newPromoted)
    setDismissedPages(newDismissed)
    saveAdminActions(newPromoted, newDismissed)

    // Remove from analytics known pages if it was promoted
    analytics.demotePageFromKnown(pageName)
    refreshStats()
  }

  const createNewCategory = () => {
    if (newCategoryName.trim()) {
      analytics.createCategory({
        name: newCategoryName.trim(),
        icon: newCategoryIcon,
        color: newCategoryColor,
        description: `Custom category for ${newCategoryName.trim()}`,
      })
      setNewCategoryName("")
      setNewCategoryIcon("📄")
      setNewCategoryColor("bg-gray-500")
      setShowNewCategory(false)
      refreshStats()
    }
  }

  const createNewTemplateHandler = () => {
    if (newTemplate.name.trim() && newTemplate.categoryId) {
      analytics.createTemplate({
        categoryId: newTemplate.categoryId,
        name: newTemplate.name.trim(),
        description: newTemplate.description.trim(),
        heroTitle: newTemplate.heroTitle.trim(),
        heroSubtitle: newTemplate.heroSubtitle.trim(),
        ctaText: newTemplate.ctaText.trim(),
        features: newTemplate.features.filter((f) => f.trim()),
        testimonialText: newTemplate.testimonialText.trim(),
        testimonialAuthor: newTemplate.testimonialAuthor.trim(),
        colorScheme: newTemplate.colorScheme,
      })

      // Reset form
      setNewTemplate({
        categoryId: "",
        name: "",
        description: "",
        heroTitle: "",
        heroSubtitle: "",
        ctaText: "",
        features: ["", "", "", "", ""],
        testimonialText: "",
        testimonialAuthor: "",
        colorScheme: {
          primary: "blue-600",
          secondary: "blue-100",
          accent: "orange-500",
        },
      })
      setShowNewTemplate(false)
      refreshStats()
    }
  }

  const generatePageCode = (template: CategoryTemplate, pageName: string) => {
    const code = analytics.generatePageFromTemplate(template.id, pageName)
    setGeneratedCode(code)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatPageName = (page: string) => {
    return page
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getPageStatus = (pageName: string) => {
    if (promotedPages.has(pageName)) return "promoted"
    if (dismissedPages.has(pageName)) return "dismissed"
    return "pending"
  }

  const colorOptions = [
    { value: "bg-red-500", label: "Red", color: "bg-red-500" },
    { value: "bg-blue-500", label: "Blue", color: "bg-blue-500" },
    { value: "bg-green-500", label: "Green", color: "bg-green-500" },
    { value: "bg-yellow-500", label: "Yellow", color: "bg-yellow-500" },
    { value: "bg-purple-500", label: "Purple", color: "bg-purple-500" },
    { value: "bg-pink-500", label: "Pink", color: "bg-pink-500" },
    { value: "bg-indigo-500", label: "Indigo", color: "bg-indigo-500" },
    { value: "bg-orange-500", label: "Orange", color: "bg-orange-500" },
    { value: "bg-gray-500", label: "Gray", color: "bg-gray-500" },
  ]

  const iconOptions = ["📄", "🚗", "🏥", "🏠", "✂️", "🐕", "🏢", "🚐", "🔧", "💼", "🎯", "⚡", "🌟", "🔥", "💎"]

  if (!stats) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-6">
            <p>Loading admin interface...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const unknownPagesArray = Object.entries(stats.unknownPages)
  const hasUnknownPages = unknownPagesArray.length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl">Page Management Admin</CardTitle>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>
          <CardDescription>
            Manage unknown pages, organize them into categories, and create templates for new landing pages.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[75vh]">
          <Tabs defaultValue="pages" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pages">Page Management</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            {/* Page Management Tab */}
            <TabsContent value="pages" className="space-y-6">
              {!hasUnknownPages ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear!</h3>
                  <p className="text-gray-600">
                    No unknown pages detected. All traffic is going to recognized landing pages.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold">Unknown Pages ({unknownPagesArray.length})</h3>
                  </div>

                  {unknownPagesArray.map(([pageName, data]) => {
                    const status = getPageStatus(pageName)

                    return (
                      <Card
                        key={pageName}
                        className={`border-l-4 ${
                          status === "promoted"
                            ? "border-l-green-500 bg-green-50"
                            : status === "dismissed"
                              ? "border-l-red-500 bg-red-50"
                              : "border-l-amber-500 bg-amber-50"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-lg">/{pageName}</h4>
                                <Badge
                                  variant={
                                    status === "promoted"
                                      ? "default"
                                      : status === "dismissed"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {status === "promoted"
                                    ? "✓ Promoted"
                                    : status === "dismissed"
                                      ? "✗ Dismissed"
                                      : "⏳ Pending"}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">{data.views}</div>
                                  <div className="text-sm text-gray-600">Views</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-green-600">{data.submissions}</div>
                                  <div className="text-sm text-gray-600">Leads</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-purple-600">{data.conversionRate}%</div>
                                  <div className="text-sm text-gray-600">Conversion</div>
                                </div>
                              </div>

                              {status === "pending" && (
                                <div className="text-sm text-gray-600 mb-3">
                                  <strong>Suggested Display Name:</strong> {formatPageName(pageName)}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col space-y-2 ml-4 min-w-[200px]">
                              {status === "pending" && (
                                <>
                                  <div className="space-y-2">
                                    <Label className="text-xs">Select Category:</Label>
                                    <Select
                                      onValueChange={(categoryId) => promotePage(pageName, categoryId)}
                                      defaultValue=""
                                    >
                                      <SelectTrigger className="h-8">
                                        <SelectValue placeholder="Choose category..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.map((category) => (
                                          <SelectItem key={category.id} value={category.id}>
                                            <div className="flex items-center space-x-2">
                                              <span>{category.icon}</span>
                                              <span>{category.name}</span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button
                                    onClick={() => dismissPage(pageName)}
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Dismiss
                                  </Button>
                                </>
                              )}

                              {status !== "pending" && (
                                <Button onClick={() => undoAction(pageName)} size="sm" variant="outline">
                                  Undo
                                </Button>
                              )}
                            </div>
                          </div>

                          {status === "promoted" && (
                            <div className="mt-3 p-3 bg-green-100 rounded-lg border border-green-200">
                              <p className="text-sm text-green-800">
                                ✅ This page has been promoted and will appear in the main analytics dashboard under its
                                assigned category.
                              </p>
                            </div>
                          )}

                          {status === "dismissed" && (
                            <div className="mt-3 p-3 bg-red-100 rounded-lg border border-red-200">
                              <p className="text-sm text-red-800">
                                ❌ This page has been dismissed and will be hidden from future admin reviews.
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Summary Stats */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 text-blue-800">Admin Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{promotedPages.size}</div>
                      <div className="text-sm text-gray-600">Promoted</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-600">{dismissedPages.size}</div>
                      <div className="text-sm text-gray-600">Dismissed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber-600">
                        {unknownPagesArray.filter(([page]) => getPageStatus(page) === "pending").length}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Category Management</h3>
                <Button
                  onClick={() => setShowNewCategory(!showNewCategory)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FolderPlus className="w-4 h-4 mr-1" />
                  New Category
                </Button>
              </div>

              {/* New Category Form */}
              {showNewCategory && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 text-green-800">Create New Category</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="e.g., E-commerce, SaaS, Consulting"
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryIcon">Icon</Label>
                        <Select value={newCategoryIcon} onValueChange={setNewCategoryIcon}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                {icon} {icon}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="categoryColor">Color</Label>
                        <Select value={newCategoryColor} onValueChange={setNewCategoryColor}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-4 h-4 rounded ${option.color}`}></div>
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end space-x-2">
                        <Button onClick={createNewCategory} size="sm" className="bg-green-600 hover:bg-green-700">
                          Create
                        </Button>
                        <Button onClick={() => setShowNewCategory(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categories Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <div className={`w-4 h-4 rounded ${category.color} inline-block`}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div className="text-xs text-gray-500">
                        Templates: {templates.filter((t) => t.categoryId === category.id).length}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Template Management</h3>
                <Button
                  onClick={() => setShowNewTemplate(!showNewTemplate)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  New Template
                </Button>
              </div>

              {/* New Template Form */}
              {showNewTemplate && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 text-purple-800">Create New Template</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Template Name</Label>
                        <Input
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                          placeholder="e.g., Modern SaaS Template"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select
                          value={newTemplate.categoryId}
                          onValueChange={(value) => setNewTemplate({ ...newTemplate, categoryId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category..." />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center space-x-2">
                                  <span>{category.icon}</span>
                                  <span>{category.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label>Description</Label>
                        <Input
                          value={newTemplate.description}
                          onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                          placeholder="Brief description of this template"
                        />
                      </div>
                      <div>
                        <Label>Hero Title</Label>
                        <Input
                          value={newTemplate.heroTitle}
                          onChange={(e) => setNewTemplate({ ...newTemplate, heroTitle: e.target.value })}
                          placeholder="Main headline"
                        />
                      </div>
                      <div>
                        <Label>CTA Text</Label>
                        <Input
                          value={newTemplate.ctaText}
                          onChange={(e) => setNewTemplate({ ...newTemplate, ctaText: e.target.value })}
                          placeholder="Get Started"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Hero Subtitle</Label>
                        <Textarea
                          value={newTemplate.heroSubtitle}
                          onChange={(e) => setNewTemplate({ ...newTemplate, heroSubtitle: e.target.value })}
                          placeholder="Supporting text for the hero section"
                          rows={2}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Features (up to 5)</Label>
                        {newTemplate.features.map((feature, index) => (
                          <Input
                            key={index}
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...newTemplate.features]
                              newFeatures[index] = e.target.value
                              setNewTemplate({ ...newTemplate, features: newFeatures })
                            }}
                            placeholder={`Feature ${index + 1}`}
                            className="mt-1"
                          />
                        ))}
                      </div>
                      <div>
                        <Label>Testimonial Text</Label>
                        <Textarea
                          value={newTemplate.testimonialText}
                          onChange={(e) => setNewTemplate({ ...newTemplate, testimonialText: e.target.value })}
                          placeholder="Customer testimonial"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Testimonial Author</Label>
                        <Input
                          value={newTemplate.testimonialAuthor}
                          onChange={(e) => setNewTemplate({ ...newTemplate, testimonialAuthor: e.target.value })}
                          placeholder="John Doe, CEO"
                        />
                      </div>
                      <div className="col-span-2 flex space-x-2">
                        <Button onClick={createNewTemplateHandler} className="bg-purple-600 hover:bg-purple-700">
                          Create Template
                        </Button>
                        <Button onClick={() => setShowNewTemplate(false)} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => {
                  const category = categories.find((c) => c.id === template.categoryId)
                  return (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span>{category?.icon}</span>
                              <h4 className="font-semibold">{template.name}</h4>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {category?.name}
                            </Badge>
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" onClick={() => setSelectedTemplate(template)}>
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="text-xs text-gray-500 mb-3">
                          <div>
                            <strong>Hero:</strong> {template.heroTitle}
                          </div>
                          <div>
                            <strong>CTA:</strong> {template.ctaText}
                          </div>
                          <div>
                            <strong>Features:</strong> {template.features.filter((f) => f).length}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="page-name"
                            className="text-xs h-8"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const input = e.target as HTMLInputElement
                                if (input.value.trim()) {
                                  generatePageCode(template, input.value.trim())
                                  input.value = ""
                                }
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              const input = (e.target as HTMLElement).parentElement?.querySelector(
                                "input",
                              ) as HTMLInputElement
                              if (input?.value.trim()) {
                                generatePageCode(template, input.value.trim())
                                input.value = ""
                              }
                            }}
                          >
                            Generate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Generated Code Modal */}
              {generatedCode && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-800">Generated Page Code</CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(generatedCode)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setGeneratedCode("")}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-auto max-h-96">
                      {generatedCode}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
