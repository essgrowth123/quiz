"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import Link from "next/link"

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
  headline,
  subheadline,
  benefits,
  formTitle,
  formDescription,
  businessLabel,
}: HeroSectionProps) {
  return (
    <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {headline}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">{subheadline}</p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Button - Mid Page */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
                asChild
              >
                <Link href="/book">📞 Book My Free Audit – ($297 Value)</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:pl-8">
            <Card className="shadow-xl border-0">
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{formTitle}</h2>
                    <p className="text-gray-600">{formDescription}</p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business">{businessLabel}</Label>
                      <Input id="business" placeholder="Your Business Name" required />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4"
                    >
                      📞 Book My Free Audit – ($297 Value)
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
