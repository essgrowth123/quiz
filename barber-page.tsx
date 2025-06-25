"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, TrendingUp, DollarSign, Users, Scissors } from "lucide-react"
import Image from "next/image"
import { LoadingProgress } from "./components/loading-progress"
import { useConversionTracking } from "./hooks/use-conversion-tracking"
import { Header } from "@/components/header"
import { analytics } from "./lib/analytics"

export default function BarberPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [retryCount, setRetryCount] = useState(0)

  const { trackFormSubmit, trackCalendlyClick, trackFormError } = useConversionTracking("barber")

  useEffect(() => {
    setLoadingProgress(10)
    const contentTimer = setTimeout(() => {
      setContentReady(true)
      setLoadingProgress((prev) => Math.max(prev, 60))
    }, 300)

    const loadingTimeout = setTimeout(() => {
      if (!logoLoaded || !contentReady) {
        setHasError(true)
        setErrorMessage("Loading is taking longer than expected. This might be due to a slow connection.")
      }
    }, 10000)

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(loadingTimeout)
    }
  }, [logoLoaded, contentReady, retryCount])

  useEffect(() => {
    if (logoLoaded) {
      setLoadingProgress((prev) => Math.max(prev, 85))
    }
  }, [logoLoaded])

  useEffect(() => {
    if (logoLoaded && contentReady && !hasError) {
      setLoadingProgress(100)
      const minLoadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(minLoadingTimer)
    }
  }, [logoLoaded, contentReady, hasError])

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

  useEffect(() => {
    // Track page view when component mounts
    analytics.track({
      page: "barber",
      event: "page_view",
    })
  }, [])

  const handleLogoLoad = () => {
    setLogoLoaded(true)
    setHasError(false)
  }

  const handleLogoError = () => {
    if (retryCount < 2) {
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
    setTimeout(() => {
      setContentReady(true)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFormSubmit(formData)
    setFormSubmitted(true)
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
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-center">
              <div className="h-12 sm:h-14 md:h-16 w-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </header>
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
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
                Success!
              </h1>
              <p className="text-xl text-gray-600 mb-8" style={{ fontFamily: "Roboto, sans-serif" }}>
                Redirecting you to Calendly to book your barbershop consultation...
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

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    color: "#333333",
                  }}
                >
                  For Barbers & Stylists:{" "}
                  <span
                    className="inline-block px-2 py-1 rounded"
                    style={{ backgroundColor: "#FFCC00", color: "#333333" }}
                  >
                    Build
                  </span>{" "}
                  Your Loyal Client Base
                </h1>

                <p
                  className="text-xl leading-relaxed"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: "#666666",
                  }}
                >
                  Tired of walk-ins who price shop and no-shows that kill your schedule? We help barbers and stylists
                  build a loyal clientele who book regularly and refer their friends.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Turn walk-ins into regular, loyal clients",
                  "Fill your appointment book weeks in advance",
                  "Charge premium rates for your expertise",
                  "Build a referral network that grows your business",
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
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-4 text-base sm:text-lg shadow-lg transition-transform active:scale-[0.97] w-full sm:w-auto"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  ✂️ Get Your Barbershop Growth Plan
                </Button>
              </div>
            </div>

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
                    Ready to Build Your Barbershop Empire?
                  </CardTitle>
                  <CardDescription
                    className="text-lg"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Get the system that turns cuts into loyal clients.
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
                        htmlFor="business"
                        className="text-base font-medium"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          color: "#333333",
                        }}
                      >
                        Shop/Business Name
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-400"
                        placeholder="Enter your barbershop name"
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
                      Get My Barbershop Growth Plan
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
                How We Help Barbers Build Loyal Client Bases
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                Our proven strategies help barbers and stylists turn one-time cuts into lifelong clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    Regular Clients
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Turn walk-ins into clients who book every 2-3 weeks religiously.
                  </p>
                </CardContent>
              </Card>

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
                    Premium Pricing
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Charge what you're worth and stop competing on price.
                  </p>
                </CardContent>
              </Card>

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
                    Referral Network
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Build a network where clients bring their friends and family.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <Scissors className="w-12 h-12" style={{ color: "#003366" }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    Full Schedule
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    Keep your chair filled with appointments booked weeks ahead.
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
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-4 text-base sm:text-lg shadow-lg transition-transform active:scale-[0.97] w-full sm:w-auto"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                💈 Build Your Barbershop Empire Today
              </Button>
            </div>
          </div>
        </div>
      </section>

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
