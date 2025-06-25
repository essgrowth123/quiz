"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/book")
  }

  const isFormValid = formData.name && formData.email && formData.business

  return (
    <section className="hero-enhanced relative overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-ess-blue via-ess-blue to-black-charcoal"></div>
      <div className="absolute inset-0 opacity-10 bg-blueprint-pattern"></div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="mobile-center space-y-8">
              {/* Enhanced Hero Heading */}
              <h1 className="hero-heading-enhanced">Ready to transform your sales process and boost conversions?</h1>

              {/* Subheadline with Construction Yellow */}
              <p className="hero-subheadline-enhanced">
                Whether you're in trades, real estate, med spas, or law—you shouldn't be guessing where your sales are
                leaking. Our 30-minute ESS Sales Leak Audit ($297 value) gives you clarity, not fluff.
              </p>

              {/* Primary CTA Button with Pulse Animation */}
              <div className="pt-6">
                <Link href="/book" className="btn-primary-enhanced btn-mobile-full text-lg px-8 py-4 inline-block">
                  📞 Book My Free Audit – ($297 Value)
                </Link>
              </div>

              {/* Quick Benefits Bullets */}
              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0 pt-6">
                <div className="flex items-start space-x-4 text-left">
                  <CheckCircle className="w-7 h-7 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-lg text-white-smoke">
                    <strong>Designed for service businesses:</strong> from contractors to closers
                  </p>
                </div>
                <div className="flex items-start space-x-4 text-left">
                  <CheckCircle className="w-7 h-7 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-lg text-white-smoke">
                    <strong>No tech stack required</strong>—just bring how you sell today
                  </p>
                </div>
                <div className="flex items-start space-x-4 text-left">
                  <CheckCircle className="w-7 h-7 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-lg text-white-smoke">
                    <strong>We'll show you what's broken</strong> and what to fix next
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Lead Capture Form */}
            <div className="w-full">
              <Card className="form-card-enhanced shadow-2xl border-0 bg-white">
                <CardHeader className="text-center pb-6 bg-white rounded-t-lg">
                  <CardTitle className="text-2xl lg:text-3xl font-bold font-oswald text-black-charcoal">
                    {formTitle}
                  </CardTitle>
                  <CardDescription className="text-lg text-steel-grey">{formDescription}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-lg font-medium text-steel-grey">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-14 text-lg border-2 focus:border-construction-yellow rounded-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-medium text-steel-grey">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-14 text-lg border-2 focus:border-construction-yellow rounded-lg"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="business" className="text-lg font-medium text-steel-grey">
                        {businessLabel}
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleInputChange}
                        className="h-14 text-lg border-2 focus:border-construction-yellow rounded-lg"
                        placeholder={`Enter your ${businessLabel.toLowerCase()}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="btn-primary-enhanced w-full text-lg px-8 py-4 disabled:opacity-50 mt-8"
                    >
                      📩 Get My Free Sales Blueprint
                    </button>

                    <p className="text-sm text-center leading-relaxed text-steel-grey pt-4">
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
