"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { useState } from "react"

interface HeroSectionProps {
  industry: string
  headline: string
  subheadline: string
  benefits: string[]
  formTitle?: string
  formDescription?: string
  businessLabel?: string
}

export function HeroSection({
  industry,
  headline,
  subheadline,
  benefits,
  formTitle = "Ready to Transform Your Business?",
  formDescription = "Get the sales training that helps you sell value, not just price.",
  businessLabel = "Business Name",
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

  const handleCTAClick = () => {
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    handleCTAClick()
  }

  const isFormValid = formData.name && formData.email && formData.business

  return (
    <section className="section-spacing bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="mobile-center space-y-6 lg:space-y-8">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                {headline}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {subheadline}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-[#FFCC00]" />
                    <p className="text-base sm:text-lg text-gray-600">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="pt-4 mobile-center-flex">
                <Button variant="primary" size="xl" onClick={handleCTAClick} className="w-full sm:w-auto">
                  📞 Book My Free Audit – ($297 Value)
                </Button>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="lg:pl-8">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{formTitle}</CardTitle>
                  <CardDescription className="text-base sm:text-lg text-gray-600">{formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium text-gray-700 text-center block">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-gray-700 text-center block">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business" className="text-base font-medium text-gray-700 text-center block">
                        {businessLabel}
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder={`Enter your ${businessLabel.toLowerCase()}`}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="xl" disabled={!isFormValid} className="w-full">
                      📩 Get My Free Sales Blueprint
                    </Button>

                    <p className="text-sm text-center leading-relaxed text-gray-500">
                      By submitting, you agree to receive communications from ESS. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
