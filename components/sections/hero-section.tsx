"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface HeroSectionProps {
  industry: string
  headline: string
  subheadline: string
  benefits: string[]
  formTitle: string
  formDescription: string
  businessLabel: string
}

export function HeroSection({
  industry,
  headline,
  subheadline,
  benefits,
  formTitle,
  formDescription,
  businessLabel,
}: HeroSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    window.location.href = "/book"
  }

  const isFormValid = formData.name && formData.email && formData.business

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 section-spacing">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="mobile-center space-y-6 lg:space-y-8">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                {headline}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0">
                {subheadline}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-yellow-500" />
                    <p className="text-base sm:text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Primary CTA - Desktop */}
              <div className="hidden lg:block pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4"
                  asChild
                >
                  <a href="/book">📞 Book My Free Audit – ($297 Value)</a>
                </Button>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="w-full">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{formTitle}</CardTitle>
                  <CardDescription className="text-base sm:text-lg text-gray-600">{formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium text-center block text-gray-700">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-500 text-center"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-center block text-gray-700">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-500 text-center"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business" className="text-base font-medium text-center block text-gray-700">
                        {businessLabel}
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-yellow-500 text-center"
                        placeholder={`Enter your ${businessLabel.toLowerCase()}`}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base px-6 py-4 disabled:opacity-50"
                    >
                      📩 Get My Free Sales Blueprint
                    </Button>

                    <p className="text-sm text-center leading-relaxed text-gray-600">
                      By submitting, you agree to receive communications from ESS. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Primary CTA - Mobile */}
              <div className="lg:hidden mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
                  asChild
                >
                  <a href="/book">📞 Book My Free Audit – ($297 Value)</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
