"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  color: "yellow" | "blue"
}

interface BenefitsSectionProps {
  title: string
  subtitle: string
  benefits: Benefit[]
  showCTA?: boolean
}

export function BenefitsSection({ title, subtitle, benefits, showCTA = true }: BenefitsSectionProps) {
  const handleCTAClick = () => {
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">
                      <IconComponent
                        className={`w-12 h-12 ${benefit.color === "yellow" ? "text-[#FFCC00]" : "text-[#003366]"}`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bottom CTA */}
          {showCTA && (
            <div className="text-center">
              <Button variant="primary" size="xl" onClick={handleCTAClick} className="w-full sm:w-auto">
                📞 Book My Free Audit – ($297 Value)
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
