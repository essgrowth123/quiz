"use client"

import type React from "react"

import { PrimaryCTA } from "./standardized-cta"
import { CheckCircle } from "lucide-react"

interface StandardizedHeroProps {
  industry: string
  headline: string
  subheadline: string
  benefits: string[]
  onCTAClick: () => void
}

export function StandardizedHero({ industry, headline, subheadline, benefits, onCTAClick }: StandardizedHeroProps) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              {/* Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#333333",
                }}
              >
                {headline}
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                {subheadline}
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto lg:mx-0">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0" style={{ color: "#FFCC00" }} />
                    <p
                      className="text-base sm:text-lg"
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

              {/* Primary CTA */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <PrimaryCTA onClick={onCTAClick} />
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="lg:pl-8">
              <StandardizedLeadForm industry={industry} onSubmit={onCTAClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Standardized Lead Capture Form Component
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormCTA } from "./standardized-cta"

interface StandardizedLeadFormProps {
  industry: string
  onSubmit: () => void
}

function StandardizedLeadForm({ industry, onSubmit }: StandardizedLeadFormProps) {
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
    onSubmit()
  }

  const getFormTitle = () => {
    switch (industry) {
      case "real-estate":
        return "Ready to Dominate Your Market?"
      case "hvac":
        return "Ready to Sell Premium HVAC?"
      case "automotive":
        return "Ready to Empower Your Sales Team?"
      case "medical":
        return "Ready to Grow Your Practice?"
      case "dentist":
        return "Ready to Build Your Dream Practice?"
      default:
        return "Ready to Transform Your Business?"
    }
  }

  const getFormDescription = () => {
    return "Get the sales training that helps you sell value, not just price."
  }

  const getBusinessLabel = () => {
    switch (industry) {
      case "real-estate":
        return "Brokerage Name"
      case "automotive":
        return "Dealership Name"
      case "medical":
      case "dentist":
        return "Practice Name"
      default:
        return "Business Name"
    }
  }

  const isFormValid = formData.name && formData.email && formData.business

  return (
    <Card className="shadow-2xl border-0 bg-white">
      <CardHeader className="text-center pb-6">
        <CardTitle
          className="text-xl sm:text-2xl font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: "#333333",
          }}
        >
          {getFormTitle()}
        </CardTitle>
        <CardDescription
          className="text-base sm:text-lg"
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "#666666",
          }}
        >
          {getFormDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-base font-medium text-center block"
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
              className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-base font-medium text-center block"
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
              className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="business"
              className="text-base font-medium text-center block"
              style={{
                fontFamily: "Roboto, sans-serif",
                color: "#333333",
              }}
            >
              {getBusinessLabel()}
            </Label>
            <Input
              id="business"
              name="business"
              type="text"
              required
              value={formData.business}
              onChange={handleInputChange}
              className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
              placeholder={`Enter your ${getBusinessLabel().toLowerCase()}`}
            />
          </div>

          <FormCTA onClick={() => {}} disabled={!isFormValid} />

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
  )
}
