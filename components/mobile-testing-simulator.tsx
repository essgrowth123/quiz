"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Tablet, Monitor, CheckCircle, XCircle } from "lucide-react"

export default function MobileTestingSimulator() {
  const [currentDevice, setCurrentDevice] = useState<"mobile" | "tablet" | "desktop">("mobile")
  const [isSimulating, setIsSimulating] = useState(false)
  const [testResults, setTestResults] = useState<any>({})

  const deviceSpecs = {
    mobile: { width: 320, height: 568, name: "iPhone SE" },
    tablet: { width: 768, height: 1024, name: "iPad" },
    desktop: { width: 1024, height: 768, name: "Desktop" },
  }

  const simulateUserJourney = async () => {
    setIsSimulating(true)
    const steps = [
      "Loading hero section",
      "Testing CTA buttons",
      "Navigating to quote funnel",
      "Filling out form",
      "Redirecting to Calendly",
      "Completing booking",
      "Showing thank you page",
    ]

    const results: any = {}

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const success = Math.random() > 0.2 // 80% success rate
      results[steps[i]] = {
        status: success ? "pass" : "fail",
        message: success ? "Step completed successfully" : "Issues detected in this step",
      }
    }

    setTestResults(results)
    setIsSimulating(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Mobile User Journey Simulator
            <Badge variant="outline">Real-time Testing</Badge>
          </CardTitle>
          <CardDescription>Simulate complete user journeys across different device sizes</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Device Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(deviceSpecs).map(([device, specs]) => (
                <Button
                  key={device}
                  variant={currentDevice === device ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCurrentDevice(device as any)}
                >
                  {device === "mobile" && <Smartphone className="h-4 w-4 mr-2" />}
                  {device === "tablet" && <Tablet className="h-4 w-4 mr-2" />}
                  {device === "desktop" && <Monitor className="h-4 w-4 mr-2" />}
                  {specs.name} ({specs.width}x{specs.height})
                </Button>
              ))}

              <Button onClick={simulateUserJourney} disabled={isSimulating} className="w-full mt-4">
                {isSimulating ? "Simulating..." : "Start User Journey Test"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>User journey test results for {deviceSpecs[currentDevice].name}</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(testResults).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Click "Start User Journey Test" to begin simulation
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(testResults).map(([step, result]: [string, any]) => (
                    <div key={step} className="flex items-center gap-3 p-3 border rounded-lg">
                      {result.status === "pass" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{step}</div>
                        <div className="text-sm text-gray-600">{result.message}</div>
                      </div>
                      <Badge variant={result.status === "pass" ? "default" : "destructive"}>
                        {result.status === "pass" ? "Pass" : "Fail"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
