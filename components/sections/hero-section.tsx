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
    <section className="hero bg-gradient-to-br from-ess-blue to-black-charcoal homepage-section">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="mobile-center space-y-8">
              {/* Clean Hero Heading - No Background */}
              <h1 style={{ background: "none", backgroundColor: "transparent" }}>
                Ready to transform your sales process and boost conversions?
              </h1>

              {/* Subheadline - Updated Color for Readability */}
              <p
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                style={{ color: "#F2C038" }}
              >
                Whether you're in trades, real estate, med spas, or law—you shouldn't be guessing where your sales are
                leaking. Our 30-minute ESS Sales Leak Audit ($297 value) gives you clarity, not fluff.
              </p>

              {/* Primary CTA Button */}
              <div className="pt-4">
                <Link href="/book" className="btn-primary btn-mobile-full text-lg px-8 py-4 inline-block">
                  📞 Book My Free Audit – ($297 Value)
                </Link>
              </div>

              {/* Quick Benefits Bullets */}
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0 pt-4">
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-base sm:text-lg text-white-smoke opacity-90">
                    <strong>Designed for service businesses:</strong> from contractors to closers
                  </p>
                </div>
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-base sm:text-lg text-white-smoke opacity-90">
                    <strong>No tech stack required</strong>—just bring how you sell today
                  </p>
                </div>
                <div className="flex items-start space-x-3 text-left">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-construction-yellow" />
                  <p className="text-base sm:text-lg text-white-smoke opacity-90">
                    <strong>We'll show you what's broken</strong> and what to fix next
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="w-full">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="text-center pb-6 bg-white">
                  <CardTitle className="text-xl sm:text-2xl font-bold font-oswald text-black-charcoal">
                    {formTitle}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg text-steel-grey">{formDescription}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium text-steel-grey">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-construction-yellow"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium text-steel-grey">
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-construction-yellow"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business" className="text-base font-medium text-steel-grey">
                        {businessLabel}
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        value={formData.business}
                        onChange={handleInputChange}
                        className="h-12 text-base border-2 focus:border-construction-yellow"
                        placeholder={`Enter your ${businessLabel.toLowerCase()}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="btn-primary w-full text-base px-6 py-4 disabled:opacity-50"
                    >
                      📩 Get My Free Sales Blueprint
                    </button>

                    <p className="text-sm text-center leading-relaxed text-steel-grey">
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
