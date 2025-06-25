"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, TrendingUp, DollarSign, Users, Award } from "lucide-react"
import Image from "next/image"
import { LoadingProgress } from "./components/loading-progress"
import { useConversionTracking } from "./hooks/use-conversion-tracking"
import { Header } from "@/components/header"
import { analytics } from "./lib/analytics"

export default function AutomotiveDealershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dealership: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  const { trackFormSubmit, trackCalendlyClick, trackFormError } = useConversionTracking("automotive")

  useEffect(() => {
    // Initialize loading progress
    setLoadingProgress(10)

    // Set content as ready after a brief delay to ensure DOM is painted
    const contentTimer = setTimeout(() => {
      setContentReady(true)
      setLoadingProgress((prev) => Math.max(prev, 60))
    }, 300)

    // Set up loading timeout
    const loadingTimeout = setTimeout(() => {
      if (!logoLoaded || !contentReady) {
        setHasError(true)
        setErrorMessage("Loading is taking longer than expected. This might be due to a slow connection.")
      }
    }, 10000) // 10 second timeout

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(loadingTimeout)
    }
  }, [logoLoaded, contentReady, retryCount])

  useEffect(() => {
    // Update progress when logo loads
    if (logoLoaded) {
      setLoadingProgress((prev) => Math.max(prev, 85))
    }
  }, [logoLoaded])

  useEffect(() => {
    // Only hide loading when both logo and content are ready
    if (logoLoaded && contentReady && !hasError) {
      // Complete the progress bar
      setLoadingProgress(100)

      // Add a minimum loading time to prevent jarring flash
      const minLoadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(minLoadingTimer)
    }
  }, [logoLoaded, contentReady, hasError])

  useEffect(() => {
    // Track page view when component mounts
    analytics.track({
      page: "ford",
      event: "page_view",
    })
  }, [])

  // Simulate progressive loading steps
  useEffect(() => {
    if (!hasError) {
      const progressSteps = [
        { delay: 200, progress: 25 },
        { delay: 400, progress: 40 },
        { delay: 600, progress: 50 },
      ]

      const timers = progressSteps.map(({ delay, progress }) =>
        setTimeout(() => {
          setLoadingProgress((prev) => Math.max(prev, progress))
        }, delay),
      )

      return () => timers.forEach(clearTimeout)
    }
  }, [hasError, retryCount])

  const handleLogoLoad = () => {
    setLogoLoaded(true)
    setHasError(false)
  }

  const handleLogoError = () => {
    if (retryCount < 2) {
      // Auto-retry up to 2 times
      setTimeout(() => {
        setRetryCount((prev) => prev + 1)
        setLogoLoaded(false)
      }, 1000)
    } else {
      setHasError(true)
      setErrorMessage("Unable to load the ESS logo. Please check your internet connection and try again.")
    }
  }

  const handleRetry = () => {
    setHasError(false)
    setErrorMessage("")
    setLogoLoaded(false)
    setContentReady(false)
    setLoadingProgress(10)
    setRetryCount(0)

    // Restart the loading process
    setTimeout(() => {
      setContentReady(true)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Track form submission
    trackFormSubmit(formData)

    setFormSubmitted(true)

    // Simulate redirect to Calendly after 2 seconds
    setTimeout(() => {
      trackCalendlyClick()
      window.open("https://calendly.com/essgrowth/30min", "_blank")
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Header Skeleton */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-center">
              <div className="h-12 sm:h-14 md:h-16 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Loading Progress Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <LoadingProgress
              progress={loadingProgress}
              hasError={hasError}
              onRetry={handleRetry}
              errorMessage={errorMessage}
            />
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column Skeleton */}
              <div className="space-y-8">
                <div className="space-y-4">
                  {/* Title Skeleton */}
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  </div>

                  {/* Subtitle Skeleton */}
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>

                {/* Benefits Skeleton */}
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse mt-1 flex-shrink-0"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Form Skeleton */}
              <div className="lg:pl-8">
                <div className="bg-white shadow-2xl rounded-lg border-0 p-6">
                  {/* Form Header Skeleton */}
                  <div className="text-center pb-6 space-y-3">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-5/6 mx-auto"></div>
                  </div>

                  {/* Form Fields Skeleton */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                      <div className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
                    </div>

                    <div className="h-14 bg-gray-200 rounded animate-pulse w-full"></div>

                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Benefits Section Skeleton */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3 mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Skeleton */}
        <footer className="bg-blue-900 py-6 mt-16" style={{ backgroundColor: "#003366" }}>
          <div className="container mx-auto px-4 text-center">
            <div className="h-4 bg-blue-800 rounded animate-pulse w-64 mx-auto"></div>
          </div>
        </footer>

        {/* Hidden Image for Loading */}
        <div className="hidden">
          <Image
            src="/ess-logo-light.png"
            alt="Engineered Success Sales"
            width={400}
            height={200}
            priority
            onLoad={handleLogoLoad}
            onError={handleLogoError}
          />
        </div>
      </div>
    )
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <Header />

        {/* Success State */}
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
                Success!
              </h1>
              <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: "Roboto, sans-serif" }}>
                Redirecting you to Calendly to book your 30-minute Sales Leak Audit...
              </p>
              <Button
                onClick={() => {
                  trackCalendlyClick()
                  window.open("https://calendly.com/essgrowth/30min", "_blank")
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg"
                style={{ fontFamily: "Montserrat, sans-serif", backgroundColor: "#003366" }}
              >
                Click Here if Not Redirected
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6 mt-16" style={{ backgroundColor: "#003366" }}>
          <div className="container mx-auto px-4 text-center">
            <p style={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}>
              © 2024 Engineered Success Sales. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    color: "#333333",
                  }}
                >
                  For Auto Dealerships:{" "}
                  <span
                    className="inline-block px-2 py-1 rounded"
                    style={{ backgroundColor: "#FFCC00", color: "#333333" }}
                  >
                    Master
                  </span>{" "}
                  Sales Conversations
                </h1>

                <p
                  className="text-xl leading-relaxed"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#666666",
                  }}
                >
                  Is your sales team struggling to convert leads into closed deals? We provide specialized training that
                  equips your salespeople with the exact words and strategies to guide customers to a 'yes'.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  "Overcome common automotive sales objections with ease",
                  "Build instant rapport and trust with car buyers",
                  "Structure compelling vehicle presentations that sell",
                  "Drive consistent, high-value automotive sales",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "#FFCC00" }} />
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        color: "#666666",
                      }}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button after benefits */}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    trackCalendlyClick()
                    window.open("https://calendly.com/essgrowth/30min", "_blank")
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 text-lg shadow-lg transition-transform active:scale-[0.97]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  📞 Get Your Free Sales Leak Audit
                </Button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <Card className="shadow-2xl border-0">
                <CardHeader className="text-center pb-6">
                  <CardTitle
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Ready to Empower Your Sales Team?
                  </CardTitle>
                  <CardDescription
                    className="text-lg"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Tell us about your dealership and your training needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-base font-medium"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#333333",
                        }}
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-400"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-medium"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#333333",
                        }}
                      >
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-400"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="dealership"
                        className="text-base font-medium"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#333333",
                        }}
                      >
                        Dealership/Company Name
                      </Label>
                      <Input
                        id="dealership"
                        name="dealership"
                        type="text"
                        required
                        value={formData.dealership}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-400"
                        placeholder="Enter your dealership or company name"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        backgroundColor: "#003366",
                      }}
                    >
                      Get Automotive Sales Training Details
                    </Button>

                    <p
                      className="text-sm text-center leading-relaxed"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        color: "#666666",
                      }}
                    >
                      By submitting, you agree to receive communications from ESS. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#333333",
                }}
              >
                How We Transform Automotive Sales Teams
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                Our specialized training focuses on practical, actionable strategies for immediate impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit Card 1 */}
              <Card className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <TrendingUp className="w-12 h-12" style={{ color: "#FFCC00" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Boost Sales Conversions
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Equip your sales team with proven techniques to close more deals on the showroom floor.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Card 2 */}
              <Card className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <DollarSign className="w-12 h-12" style={{ color: "#003366" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Increase Profit Margins
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Optimize your sales process to maximize every customer interaction and upsell opportunity.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Card 3 */}
              <Card className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Users className="w-12 h-12" style={{ color: "#FFCC00" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Empower Your Sales Team
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Provide your team with the confidence and skills to handle objections and guide customers to a
                    'yes'.
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Card 4 */}
              <Card className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Award className="w-12 h-12" style={{ color: "#003366" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Enhance Customer Experience
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Train your staff to build rapport and trust, leading to higher customer satisfaction and referrals.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button after benefits section */}
            <div className="text-center mt-12">
              <Button
                onClick={() => {
                  trackCalendlyClick()
                  window.open("https://calendly.com/essgrowth/30min", "_blank")
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 text-lg shadow-lg transition-transform active:scale-[0.97]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                🚗 Start Transforming Your Sales Team Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6" style={{ backgroundColor: "#003366" }}>
        <div className="container mx-auto px-4 text-center">
          <p style={{ fontFamily: "Roboto, sans-serif", color: "#FFFFFF" }}>
            © 2024 Engineered Success Sales. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
