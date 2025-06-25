"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

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
}

export function BenefitsSection({ title, subtitle, benefits }: BenefitsSectionProps) {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              const bgColor = benefit.color === "yellow" ? "bg-yellow-100" : "bg-blue-100"
              const iconColor = benefit.color === "yellow" ? "text-yellow-600" : "text-blue-600"

              return (
                <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
              asChild
            >
              <Link href="/book">📞 Book My Free Audit – ($297 Value)</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
