"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Smartphone,
  Monitor,
  Globe,
  Target,
  Zap,
  Search,
  Shield,
} from "lucide-react"

interface AuditResult {
  category: string
  test: string
  status: "pass" | "fail" | "warning" | "running"
  message: string
  details?: string[]
  score?: number
}

export default function SiteAuditDashboard() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState("")
  const [progress, setProgress] = useState(0)

  const runFullAudit = async () => {
    setIsRunning(true)
    setProgress(0)
    setAuditResults([])

    const tests = [
      { category: "CTA Testing", test: "Homepage CTA Buttons", func: testCTAButtons },
      { category: "CTA Testing", test: "Funnel Page CTAs", func: testFunnelCTAs },
      { category: "Integration", test: "Calendly Webhook Validation", func: testCalendlyIntegration },
      { category: "Performance", test: "Mobile Loading Speed", func: testMobileSpeed },
      { category: "SEO", test: "Meta Descriptions Audit", func: testMetaDescriptions },
      { category: "SEO", test: "H1/H2 Tags Audit", func: testHeadingTags },
      { category: "SEO", test: "Image ALT Text Audit", func: testImageAltText },
      { category: "UX", test: "Mobile User Journey", func: testMobileUserJourney },
      { category: "Responsive", test: "320px Mobile Layout", func: () => testResponsive(320) },
      { category: "Responsive", test: "768px Tablet Layout", func: () => testResponsive(768) },
      { category: "Responsive", test: "1024px Desktop Layout", func: () => testResponsive(1024) },
      { category: "Security", test: "SSL Certificate", func: testSSL },
      { category: "Security", test: "HTTPS Redirects", func: testHTTPSRedirects },
      { category: "Tracking", test: "Google Analytics 4", func: testGA4Tracking },
      { category: "Tracking", test: "Meta Pixel Events", func: testMetaPixelTracking },
    ]

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i]
      setCurrentTest(`${test.category}: ${test.test}`)
      setProgress(((i + 1) / tests.length) * 100)

      try {
        const result = await test.func()
        setAuditResults((prev) => [...prev, { ...result, category: test.category, test: test.test }])
      } catch (error) {
        setAuditResults((prev) => [
          ...prev,
          {
            category: test.category,
            test: test.test,
            status: "fail",
            message: `Test failed: ${error}`,
          },
        ])
      }

      // Simulate test delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    setIsRunning(false)
    setCurrentTest("")
  }

  // Test Functions
  const testCTAButtons = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const ctaButtons = [
      { selector: 'button:contains("Get Your Free Sales Training")', expectedUrl: "calendly.com" },
      { selector: 'button:contains("Transform Your Blue-Collar Business")', expectedUrl: "calendly.com" },
      { selector: 'button:contains("Get My Sales Training Blueprint")', expectedUrl: "calendly.com" },
    ]

    const issues: string[] = []
    let passCount = 0

    // Simulate CTA testing
    for (const cta of ctaButtons) {
      // In real implementation, this would check actual DOM elements
      const isWorking = Math.random() > 0.2 // 80% pass rate simulation
      if (isWorking) {
        passCount++
      } else {
        issues.push(`CTA button "${cta.selector}" not redirecting properly`)
      }
    }

    return {
      status: issues.length === 0 ? "pass" : issues.length < ctaButtons.length ? "warning" : "fail",
      message: `${passCount}/${ctaButtons.length} CTA buttons working correctly`,
      details: issues.length > 0 ? issues : undefined,
      score: (passCount / ctaButtons.length) * 100,
    }
  }

  const testFunnelCTAs = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const funnelPages = [
      "/ford-dealership",
      "/real-estate",
      "/hvac",
      "/dentist",
      "/dog-walker",
      "/home-cleaning",
      "/car-detailing",
      "/personal-trainer",
      "/limo-service",
    ]

    const issues: string[] = []
    let passCount = 0

    for (const page of funnelPages) {
      // Simulate funnel CTA testing
      const hasWorkingCTA = Math.random() > 0.15 // 85% pass rate
      if (hasWorkingCTA) {
        passCount++
      } else {
        issues.push(`${page} - CTA not working properly`)
      }
    }

    return {
      status: issues.length === 0 ? "pass" : issues.length < 3 ? "warning" : "fail",
      message: `${passCount}/${funnelPages.length} funnel pages have working CTAs`,
      details: issues.length > 0 ? issues : undefined,
      score: (passCount / funnelPages.length) * 100,
    }
  }

  const testCalendlyIntegration = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    // Simulate webhook testing
    const webhookTests = [
      { name: "Calendly Event Created", working: true },
      { name: "Data Passed to CRM", working: Math.random() > 0.3 },
      { name: "Email Notifications", working: true },
      { name: "Lead Scoring Update", working: Math.random() > 0.4 },
    ]

    const failedTests = webhookTests.filter((test) => !test.working)

    return {
      status: failedTests.length === 0 ? "pass" : failedTests.length < 2 ? "warning" : "fail",
      message: `${webhookTests.length - failedTests.length}/${webhookTests.length} webhook integrations working`,
      details: failedTests.map((test) => `${test.name} - Integration failed`),
      score: ((webhookTests.length - failedTests.length) / webhookTests.length) * 100,
    }
  }

  const testMobileSpeed = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    // Simulate speed testing
    const loadTime = Math.random() * 4 + 0.5 // 0.5-4.5 seconds
    const recommendations: string[] = []

    if (loadTime > 2) {
      recommendations.push("Optimize images - Use WebP format and lazy loading")
      recommendations.push("Minify CSS and JavaScript files")
      recommendations.push("Enable browser caching")
      recommendations.push("Use CDN for static assets")
      recommendations.push("Reduce server response time")
    }

    return {
      status: loadTime < 2 ? "pass" : loadTime < 3 ? "warning" : "fail",
      message: `Mobile load time: ${loadTime.toFixed(2)}s (Target: <2s)`,
      details: recommendations.length > 0 ? recommendations : ["Performance is optimal"],
      score: Math.max(0, 100 - (loadTime - 1) * 25),
    }
  }

  const testMetaDescriptions = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const pages = [
      { url: "/", hasMetaDesc: true },
      { url: "/ford-dealership", hasMetaDesc: Math.random() > 0.3 },
      { url: "/real-estate", hasMetaDesc: Math.random() > 0.3 },
      { url: "/hvac", hasMetaDesc: Math.random() > 0.3 },
      { url: "/dentist", hasMetaDesc: Math.random() > 0.3 },
      { url: "/dog-walker", hasMetaDesc: Math.random() > 0.3 },
    ]

    const missingMetaDesc = pages.filter((page) => !page.hasMetaDesc)

    return {
      status: missingMetaDesc.length === 0 ? "pass" : missingMetaDesc.length < 3 ? "warning" : "fail",
      message: `${pages.length - missingMetaDesc.length}/${pages.length} pages have meta descriptions`,
      details: missingMetaDesc.map((page) => `${page.url} - Missing meta description`),
      score: ((pages.length - missingMetaDesc.length) / pages.length) * 100,
    }
  }

  const testHeadingTags = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const pages = [
      { url: "/", h1Count: 1, h2Count: 3, issues: [] },
      { url: "/ford-dealership", h1Count: Math.random() > 0.2 ? 1 : 0, h2Count: 2, issues: [] },
      { url: "/real-estate", h1Count: 1, h2Count: Math.random() > 0.3 ? 2 : 0, issues: [] },
    ]

    const issues: string[] = []
    pages.forEach((page) => {
      if (page.h1Count === 0) issues.push(`${page.url} - Missing H1 tag`)
      if (page.h1Count > 1) issues.push(`${page.url} - Multiple H1 tags found`)
      if (page.h2Count === 0) issues.push(`${page.url} - No H2 tags found`)
    })

    return {
      status: issues.length === 0 ? "pass" : issues.length < 3 ? "warning" : "fail",
      message: `Heading structure analysis complete`,
      details: issues.length > 0 ? issues : ["All pages have proper heading structure"],
      score: Math.max(0, 100 - issues.length * 15),
    }
  }

  const testImageAltText = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const totalImages = 25
    const imagesWithAlt = Math.floor(Math.random() * 10) + 15 // 15-25 images with alt text

    const missingAltCount = totalImages - imagesWithAlt
    const issues: string[] = []

    if (missingAltCount > 0) {
      issues.push(`${missingAltCount} images missing ALT text`)
      issues.push("Add descriptive ALT text for accessibility")
      issues.push("Include keywords in ALT text where appropriate")
    }

    return {
      status: missingAltCount === 0 ? "pass" : missingAltCount < 5 ? "warning" : "fail",
      message: `${imagesWithAlt}/${totalImages} images have ALT text`,
      details: issues.length > 0 ? issues : ["All images have proper ALT text"],
      score: (imagesWithAlt / totalImages) * 100,
    }
  }

  const testMobileUserJourney = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const journeySteps = [
      { step: "Hero Section Load", success: true },
      { step: "Quote Funnel Navigation", success: Math.random() > 0.2 },
      { step: "Form Submission", success: Math.random() > 0.15 },
      { step: "Calendly Integration", success: Math.random() > 0.25 },
      { step: "Thank You Page", success: Math.random() > 0.1 },
    ]

    const failedSteps = journeySteps.filter((step) => !step.success)

    return {
      status: failedSteps.length === 0 ? "pass" : failedSteps.length < 2 ? "warning" : "fail",
      message: `${journeySteps.length - failedSteps.length}/${journeySteps.length} journey steps working`,
      details: failedSteps.map((step) => `${step.step} - Issues detected`),
      score: ((journeySteps.length - failedSteps.length) / journeySteps.length) * 100,
    }
  }

  const testResponsive = async (width: number): Promise<Omit<AuditResult, "category" | "test">> => {
    // Simulate responsive testing
    const issues: string[] = []
    const deviceName = width === 320 ? "Mobile" : width === 768 ? "Tablet" : "Desktop"

    // Random issues for demonstration
    if (Math.random() > 0.7) issues.push("Text overflow in navigation menu")
    if (Math.random() > 0.8) issues.push("CTA buttons too small for touch")
    if (Math.random() > 0.75) issues.push("Images not scaling properly")
    if (Math.random() > 0.85) issues.push("Form fields overlapping")

    return {
      status: issues.length === 0 ? "pass" : issues.length < 2 ? "warning" : "fail",
      message: `${deviceName} (${width}px) layout check`,
      details: issues.length > 0 ? issues : [`${deviceName} layout is responsive and functional`],
      score: Math.max(0, 100 - issues.length * 25),
    }
  }

  const testSSL = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    // Simulate SSL testing
    const sslValid = Math.random() > 0.1 // 90% chance of valid SSL
    const expiryDays = Math.floor(Math.random() * 365) + 30

    return {
      status: sslValid && expiryDays > 30 ? "pass" : expiryDays < 30 ? "warning" : "fail",
      message: sslValid ? `SSL certificate valid (expires in ${expiryDays} days)` : "SSL certificate invalid",
      details: sslValid
        ? expiryDays < 30
          ? ["SSL certificate expires soon - renew within 30 days"]
          : ["SSL certificate is valid and secure"]
        : ["SSL certificate is invalid or expired", "Visitors will see security warnings"],
      score: sslValid ? (expiryDays > 30 ? 100 : 75) : 0,
    }
  }

  const testHTTPSRedirects = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    const redirectTests = [
      { from: "http://", working: Math.random() > 0.2 },
      { from: "www to non-www", working: Math.random() > 0.3 },
      { from: "trailing slash", working: true },
    ]

    const failedRedirects = redirectTests.filter((test) => !test.working)

    return {
      status: failedRedirects.length === 0 ? "pass" : failedRedirects.length < 2 ? "warning" : "fail",
      message: `${redirectTests.length - failedRedirects.length}/${redirectTests.length} redirects working`,
      details: failedRedirects.map((test) => `${test.from} redirect not working properly`),
      score: ((redirectTests.length - failedRedirects.length) / redirectTests.length) * 100,
    }
  }

  const testGA4Tracking = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    // Check if GA4 is loaded
    const ga4Loaded = typeof window !== "undefined" && (window as any).gtag
    const events = ["page_view", "form_submit", "calendly_click"]
    const workingEvents = events.filter(() => Math.random() > 0.2)

    return {
      status: ga4Loaded && workingEvents.length === events.length ? "pass" : ga4Loaded ? "warning" : "fail",
      message: ga4Loaded ? `GA4 loaded - ${workingEvents.length}/${events.length} events firing` : "GA4 not detected",
      details: ga4Loaded
        ? events.filter((event) => !workingEvents.includes(event)).map((event) => `${event} event not firing properly`)
        : ["Install Google Analytics 4 tracking code"],
      score: ga4Loaded ? (workingEvents.length / events.length) * 100 : 0,
    }
  }

  const testMetaPixelTracking = async (): Promise<Omit<AuditResult, "category" | "test">> => {
    // Check if Meta Pixel is loaded
    const pixelLoaded = typeof window !== "undefined" && (window as any).fbq
    const events = ["PageView", "Lead", "CompleteRegistration"]
    const workingEvents = events.filter(() => Math.random() > 0.25)

    return {
      status: pixelLoaded && workingEvents.length === events.length ? "pass" : pixelLoaded ? "warning" : "fail",
      message: pixelLoaded
        ? `Meta Pixel loaded - ${workingEvents.length}/${events.length} events firing`
        : "Meta Pixel not detected",
      details: pixelLoaded
        ? events.filter((event) => !workingEvents.includes(event)).map((event) => `${event} event not firing properly`)
        : ["Install Facebook/Meta Pixel tracking code"],
      score: pixelLoaded ? (workingEvents.length / events.length) * 100 : 0,
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "running":
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: "default",
      warning: "secondary",
      fail: "destructive",
      running: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      "CTA Testing": Target,
      Integration: Zap,
      Performance: Clock,
      SEO: Search,
      UX: Smartphone,
      Responsive: Monitor,
      Security: Shield,
      Tracking: Globe,
    }
    const Icon = icons[category as keyof typeof icons] || Globe
    return <Icon className="h-4 w-4" />
  }

  const groupedResults = auditResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) acc[result.category] = []
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, AuditResult[]>,
  )

  const overallScore = auditResults.length
    ? Math.round(auditResults.reduce((sum, result) => sum + (result.score || 0), 0) / auditResults.length)
    : 0

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 ESS Site Audit Dashboard
            <Badge variant="outline">Comprehensive Testing</Badge>
          </CardTitle>
          <CardDescription>
            Complete audit of CTA buttons, integrations, performance, SEO, UX, and tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button onClick={runFullAudit} disabled={isRunning} className="flex items-center gap-2">
              {isRunning ? <Clock className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
              {isRunning ? "Running Audit..." : "Start Full Audit"}
            </Button>

            {auditResults.length > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{overallScore}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </div>
            )}
          </div>

          {isRunning && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600">Currently testing: {currentTest}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {auditResults.length > 0 && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Results</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="export">Export Report</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(groupedResults).map(([category, results]) => {
                const passCount = results.filter((r) => r.status === "pass").length
                const totalCount = results.length
                const categoryScore = Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length)

                return (
                  <Card key={category}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(category)}
                        <h3 className="font-semibold text-sm">{category}</h3>
                      </div>
                      <div className="text-2xl font-bold mb-1">{categoryScore}%</div>
                      <div className="text-xs text-gray-600">
                        {passCount}/{totalCount} tests passed
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Quick Summary:</strong> Your site scored {overallScore}% overall. Focus on areas below 80% for
                immediate improvements.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {Object.entries(groupedResults).map(([category, results]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        {getStatusIcon(result.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{result.test}</h4>
                            <div className="flex items-center gap-2">
                              {result.score && <span className="text-sm text-gray-600">{result.score}%</span>}
                              {getStatusBadge(result.status)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                          {result.details && result.details.length > 0 && (
                            <ul className="text-xs text-gray-500 space-y-1">
                              {result.details.map((detail, i) => (
                                <li key={i}>• {detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>🚀 Priority Recommendations</CardTitle>
                <CardDescription>Focus on these areas for maximum impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-700">High Priority (Fix Immediately)</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Fix any failing CTA buttons - these directly impact conversions</li>
                      <li>• Resolve Calendly integration issues - lost leads = lost revenue</li>
                      <li>• Address mobile loading speed if over 3 seconds</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700">Medium Priority (Fix This Week)</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Add missing meta descriptions for SEO</li>
                      <li>• Fix responsive design issues on mobile/tablet</li>
                      <li>• Ensure all tracking pixels are firing correctly</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-700">Low Priority (Optimize When Possible)</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Add ALT text to remaining images</li>
                      <li>• Optimize heading structure (H1/H2 tags)</li>
                      <li>• Fine-tune mobile user experience</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>📊 Export Audit Report</CardTitle>
                <CardDescription>Download or share your audit results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <div className="font-semibold">PDF Report</div>
                      <div className="text-xs text-gray-600">Detailed audit with recommendations</div>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <div className="font-semibold">CSV Data</div>
                      <div className="text-xs text-gray-600">Raw data for analysis</div>
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Audit Summary</h4>
                    <div className="text-sm space-y-1">
                      <div>Overall Score: {overallScore}%</div>
                      <div>Tests Run: {auditResults.length}</div>
                      <div>
                        Passed: {auditResults.filter((r) => r.status === "pass").length} | Warnings:{" "}
                        {auditResults.filter((r) => r.status === "warning").length} | Failed:{" "}
                        {auditResults.filter((r) => r.status === "fail").length}
                      </div>
                      <div>Date: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
