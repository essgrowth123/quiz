import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface BenefitProps {
  icon: LucideIcon
  title: string
  description: string
  color: "blue" | "yellow"
}

interface BenefitsSectionProps {
  title: string
  subtitle: string
  benefits: BenefitProps[]
}

export function BenefitsSection({ title, subtitle, benefits }: BenefitsSectionProps) {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const bgColor = benefit.color === "blue" ? "bg-blue-50" : "bg-yellow-50"
            const iconColor = benefit.color === "blue" ? "text-blue-600" : "text-yellow-600"

            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-200 text-center"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 lg:mt-16 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 w-full sm:w-auto"
            asChild
          >
            <Link href="/book">📞 Book My Free Audit – ($297 Value)</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
