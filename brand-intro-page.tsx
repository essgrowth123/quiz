"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Home, Wrench, Stethoscope, Smile, Heart, Sparkles, Award, Scissors, Star, Zap } from "lucide-react"
import Image from "next/image"
import { LoadingProgress } from "./components/loading-progress"
import { Header } from "@/components/header"

interface IndustryOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

const industries: IndustryOption[] = [
  {
    id: "blue-collar",
    name: "Blue-Collar Services",
    icon: <Wrench className="w-8 h-8" />,
    description: "General contractors, plumbers, electricians",
    color: "#FFCC00",
  },
  {
    id: "automotive",
    name: "Auto Dealerships",
    icon: <Car className="w-8 h-8" />,
    description: "Car sales, automotive services",
    color: "#003366",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: <Home className="w-8 h-8" />,
    description: "Agents, brokers, property sales",
    color: "#FFCC00",
  },
  {
    id: "hvac",
    name: "HVAC Services",
    icon: <Wrench className="w-8 h-8" />,
    description: "Heating, cooling, ventilation",
    color: "#003366",
  },
  {
    id: "medical",
    name: "Medical Practices",
    icon: <Stethoscope className="w-8 h-8" />,
    description: "Doctors, clinics, healthcare",
    color: "#FFCC00",
  },
  {
    id: "dentist",
    name: "Dental Practices",
    icon: <Smile className="w-8 h-8" />,
    description: "Dentists, orthodontists, oral care",
    color: "#003366",
  },
  {
    id: "dog-walker",
    name: "Pet Services",
    icon: <Heart className="w-8 h-8" />,
    description: "Dog walking, pet sitting, grooming",
    color: "#FFCC00",
  },
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    icon: <Sparkles className="w-8 h-8" />,
    description: "House cleaning, maid services",
    color: "#003366",
  },
  {
    id: "dog-training",
    name: "Dog Training",
    icon: <Award className="w-8 h-8" />,
    description: "Pet training, behavior modification",
    color: "#FFCC00",
  },
  {
    id: "car-detailing",
    name: "Car Detailing",
    icon: <Star className="w-8 h-8" />,
    description: "Auto detailing, car care services",
    color: "#003366",
  },
  {
    id: "personal-trainer",
    name: "Personal Training",
    icon: <Zap className="w-8 h-8" />,
    description: "Fitness coaching, personal training",
    color: "#FFCC00",
  },
  {
    id: "barber",
    name: "Barber & Styling",
    icon: <Scissors className="w-8 h-8" />,
    description: "Barbershops, hair styling",
    color: "#003366",
  },
]

interface BrandIntroPageProps {
  onIndustrySelect: (industry: string) => void
}

export default function BrandIntroPage({ onIndustrySelect }: BrandIntroPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [retryCount, setRetryCount] = useState(0)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Introduction */}
          {/* Video-Ready Hero Section */}
          <div className="mb-16">
            <h1
              className="text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: "Oswald, sans-serif",
                color: "#003366",
              }}
            >
              Learn Your Worth & Charge For It
            </h1>

            <h2
              className="text-4xl lg:text-5xl font-bold mb-8"
              style={{
                fontFamily: "Oswald, sans-serif",
                color: "#333333",
              }}
            >
              We Don't Just Build Sales Teams...{" "}
              <span className="inline-block px-3 py-2 rounded" style={{ backgroundColor: "#FFCC00", color: "#003366" }}>
                We Engineer
              </span>{" "}
              Your Success!
            </h2>

            {/* Update the value props to include marketing services */}
            <div className="grid md:grid-cols-5 gap-6 mb-12">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Training
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  Sales systems that work in the real world.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Websites
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  Landing pages that convert visitors to clients.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Marketing
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  SEO, AI optimization, social media, PR & IP.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Systems
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  Processes, automations & software to scale properly, stay organized & give you more time.
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Results
                </h3>
                <p style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  Measurable growth you can count on.
                </p>
              </div>
            </div>

            {/* Automation Examples Section */}
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3
                className="text-3xl font-bold mb-8 text-center"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#003366",
                }}
              >
                Automation Examples That Save You Hours Every Day
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">🤖</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Lead Follow-Up
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• Instant text & email responses</li>
                    <li>• Automatic lead scoring & routing</li>
                    <li>• Follow-up sequences that never miss</li>
                    <li>• Hot lead alerts to your phone</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">📅</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Appointment Scheduling
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• 24/7 online booking system</li>
                    <li>• Automatic confirmations & reminders</li>
                    <li>• No-show reduction sequences</li>
                    <li>• Calendar sync across all devices</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">🎯</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Customer Onboarding
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• Welcome sequences that wow</li>
                    <li>• Automatic document collection</li>
                    <li>• Progress tracking & check-ins</li>
                    <li>• Upsell opportunities at perfect timing</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">💰</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Payment Processing
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• Automatic invoice generation</li>
                    <li>• Payment reminders & collections</li>
                    <li>• Recurring billing setup</li>
                    <li>• Real-time payment notifications</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">📊</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Reporting & Analytics
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• Daily performance dashboards</li>
                    <li>• Automatic ROI calculations</li>
                    <li>• Lead source tracking</li>
                    <li>• Weekly business health reports</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl mb-4 text-center">🔄</div>
                  <h4
                    className="text-xl font-bold mb-3 text-center"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}
                  >
                    Customer Retention
                  </h4>
                  <ul className="space-y-2" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                    <li>• Birthday & anniversary campaigns</li>
                    <li>• Win-back sequences for lost clients</li>
                    <li>• Referral program automation</li>
                    <li>• Review request workflows</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg font-bold mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#003366" }}>
                  Stop Doing Manual Work That Software Can Handle
                </p>
                <p className="text-base" style={{ fontFamily: "Roboto, sans-serif", color: "#666666" }}>
                  These automations typically save business owners 15-25 hours per week while increasing revenue by
                  30-50%
                </p>
              </div>
            </div>

            {/* Update the hook to match the authentic messaging */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border-l-4" style={{ borderLeftColor: "#FFCC00" }}>
              <p
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#003366",
                }}
              >
                "Stop undercharging for your expertise..."
              </p>
              <p
                className="text-xl"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                It's time to learn your worth and charge for it. Let's build the systems that get you paid what you
                deserve.
              </p>
            </div>
          </div>

          {/* Industry Selection */}
          <div className="mb-12">
            <h3
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: "Oswald, sans-serif",
                color: "#333333",
              }}
            >
              Select Your Industry
            </h3>
            <p
              className="text-xl mb-8"
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "#666666",
              }}
            >
              Choose your business type to see how we can engineer your success
            </p>
          </div>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {industries.map((industry) => (
              <Card
                key={industry.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-yellow-400"
                onClick={() => onIndustrySelect(industry.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center" style={{ color: industry.color }}>
                    {industry.icon}
                  </div>
                  <h4
                    className="text-lg font-bold mb-2"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      color: "#333333",
                    }}
                  >
                    {industry.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      color: "#666666",
                    }}
                  >
                    {industry.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-8 text-white"
            style={{ background: "linear-gradient(135deg, #003366 0%, #004080 100%)" }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>
              Ready to Engineer Your Success?
            </h3>
            <p className="text-lg mb-6" style={{ fontFamily: "Roboto, sans-serif" }}>
              Don't see your industry? No problem! Our systems work for any business that needs to sell.
            </p>
            <Button
              onClick={() => onIndustrySelect("blue-collar")}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-3 text-lg"
              style={{
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#FFCC00",
                color: "#003366",
              }}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8" style={{ backgroundColor: "#003366" }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            Engineered Success Sales
          </p>
          <p className="text-sm" style={{ fontFamily: "Roboto, sans-serif", color: "#CCCCCC" }}>
            © 2024 Engineered Success Sales. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
