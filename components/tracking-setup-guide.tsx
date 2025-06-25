"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Copy, ExternalLink } from "lucide-react"

export default function TrackingSetupGuide() {
  const [gaId, setGaId] = useState("")
  const [fbPixelId, setFbPixelId] = useState("")
  const [testResults, setTestResults] = useState<any>({})

  const runTrackingTest = () => {
    const results: any = {}

    // Test Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      results.ga = { status: "success", message: "Google Analytics loaded successfully" }
      ;(window as any).gtag("event", "test_setup", {
        event_category: "setup",
        event_label: "tracking_test",
      })
    } else {
      results.ga = { status: "error", message: "Google Analytics not detected" }
    }

    // Test Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      results.fb = { status: "success", message: "Facebook Pixel loaded successfully" }
      ;(window as any).fbq("track", "CustomEvent", {
        event_name: "setup_test",
      })
    } else {
      results.fb = { status: "error", message: "Facebook Pixel not detected" }
    }

    // Test cookies
    const cookiesAccepted = localStorage.getItem("cookies-accepted")
    results.cookies = {
      status: cookiesAccepted ? "success" : "warning",
      message: cookiesAccepted ? "Cookies accepted" : "Cookies not accepted yet",
    }

    setTestResults(results)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Tracking Setup Guide
            <Badge variant="outline">ESS Analytics</Badge>
          </CardTitle>
          <CardDescription>
            Set up Google Analytics and Facebook Pixel for remarketing and conversion tracking
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="google-analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="google-analytics">Google Analytics</TabsTrigger>
          <TabsTrigger value="facebook-pixel">Facebook Pixel</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="remarketing">Remarketing</TabsTrigger>
        </TabsList>

        <TabsContent value="google-analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Google Analytics Setup</CardTitle>
              <CardDescription>Track website visitors and conversions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ga-id">Measurement ID</Label>
                <div className="flex gap-2">
                  <Input id="ga-id" placeholder="G-XXXXXXXXXX" value={gaId} onChange={(e) => setGaId(e.target.value)} />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(gaId)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">📋 Setup Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      rel="noreferrer"
                    >
                      Google Analytics <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>Create a new GA4 property for "Elite Sales Solutions"</li>
                  <li>
                    Add your website URL: <code className="bg-gray-200 px-1 rounded">https://yourdomain.com</code>
                  </li>
                  <li>Copy your Measurement ID (starts with G-)</li>
                  <li>Replace "G-XXXXXXXXXX" in the code with your actual ID</li>
                  <li>Deploy the updated code</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 What You'll Track:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Page views on each landing page</li>
                  <li>• Form submissions (leads)</li>
                  <li>• Time spent on pages</li>
                  <li>• Traffic sources (Google, Facebook, direct)</li>
                  <li>• Mobile vs desktop usage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facebook-pixel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📘 Facebook Pixel Setup</CardTitle>
              <CardDescription>Enable Facebook and Instagram remarketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-pixel-id">Pixel ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="fb-pixel-id"
                    placeholder="1234567890123456"
                    value={fbPixelId}
                    onChange={(e) => setFbPixelId(e.target.value)}
                  />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(fbPixelId)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">📋 Setup Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://business.facebook.com"
                      target="_blank"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      rel="noreferrer"
                    >
                      Facebook Business Manager <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>Navigate to Events Manager</li>
                  <li>Create a new Pixel for "ESS Landing Pages"</li>
                  <li>Copy your Pixel ID (16-digit number)</li>
                  <li>Replace "YOUR_PIXEL_ID" in the code with your actual ID</li>
                  <li>Deploy and test with Facebook Pixel Helper extension</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Remarketing Capabilities:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Show ads to website visitors</li>
                  <li>• Target people who viewed specific pages</li>
                  <li>• Create lookalike audiences</li>
                  <li>• Track form submissions as conversions</li>
                  <li>• Optimize for lead generation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🧪 Test Your Tracking</CardTitle>
              <CardDescription>Verify everything is working correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runTrackingTest} className="w-full">
                Run Tracking Test
              </Button>

              {Object.keys(testResults).length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Test Results:</h4>

                  {testResults.ga && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                      {testResults.ga.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">Google Analytics:</span>
                      <span className={testResults.ga.status === "success" ? "text-green-600" : "text-red-600"}>
                        {testResults.ga.message}
                      </span>
                    </div>
                  )}

                  {testResults.fb && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                      {testResults.fb.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">Facebook Pixel:</span>
                      <span className={testResults.fb.status === "success" ? "text-green-600" : "text-red-600"}>
                        {testResults.fb.message}
                      </span>
                    </div>
                  )}

                  {testResults.cookies && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
                      {testResults.cookies.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                      <span className="font-medium">Cookies:</span>
                      <span className={testResults.cookies.status === "success" ? "text-green-600" : "text-yellow-600"}>
                        {testResults.cookies.message}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔧 Debug Tools:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • Press <kbd className="bg-blue-200 px-1 rounded">Ctrl+Shift+D</kbd> to open debug panel
                  </li>
                  <li>
                    • Use browser console: <code>testTracking()</code>
                  </li>
                  <li>• Install Facebook Pixel Helper Chrome extension</li>
                  <li>• Use Google Analytics Debugger extension</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remarketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Remarketing Strategy</CardTitle>
              <CardDescription>How to use your tracking data for marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Facebook Audiences:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Website visitors (last 30 days)</li>
                    <li>• Form submitters (hot leads)</li>
                    <li>• Page-specific visitors</li>
                    <li>• Lookalike audiences</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Google Ads:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Search remarketing lists</li>
                    <li>• Display remarketing</li>
                    <li>• YouTube remarketing</li>
                    <li>• Similar audiences</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💰 Campaign Ideas:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• "Still interested in sales training?" - to website visitors</li>
                  <li>• Special offers to form submitters</li>
                  <li>• Industry-specific ads based on page visits</li>
                  <li>• Video testimonials to engaged visitors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
