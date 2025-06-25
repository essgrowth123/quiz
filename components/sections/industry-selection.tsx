"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const industries = [
  {
    title: "Real Estate Pros",
    description: "Close more listings by tightening your quoting follow-up.",
    href: "/real-estate",
    emoji: "🏠",
  },
  {
    title: "Contractors & Home Services",
    description: "Turn 'let me think about it' into signed work orders.",
    href: "/contractors",
    emoji: "🛠️",
  },
  {
    title: "Auto Detailing Businesses",
    description: "Automate your schedule, upsell services, and stop chasing leads.",
    href: "/auto-detailing",
    emoji: "🚗",
  },
  {
    title: "Landscaping & Exterior Services",
    description: "Level up from busy operator to booked-out boss.",
    href: "/landscaping",
    emoji: "🌱",
  },
  {
    title: "More Industries",
    description: "Serving Doctors, Dentists, Med Spas, Attorneys, Coaches & More",
    href: "#who-we-helped",
    emoji: "🏥",
  },
]

export function IndustrySelection() {
  return (
    <section id="industries" className="homepage-section bg-white-smoke">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black-charcoal mb-6 font-oswald">
              Choose Your Industry
            </h2>
            <p className="text-lg sm:text-xl text-steel-grey max-w-3xl mx-auto">
              Get specialized sales training designed for your specific business type and customer challenges.
            </p>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-8">
            {industries.map((industry) => (
              <Link key={industry.href} href={industry.href} className="group">
                <Card className="industry-card h-full border-2 border-transparent group-hover:border-construction-yellow bg-white">
                  <CardContent className="p-8 lg:p-10 text-center h-full flex flex-col justify-center">
                    <div className="text-6xl mb-6 icon-hover">{industry.emoji}</div>
                    <h3 className="text-xl lg:text-2xl font-bold text-black-charcoal mb-4 group-hover:text-ess-blue transition-colors duration-300 font-oswald">
                      {industry.title}
                    </h3>
                    <p className="text-steel-grey leading-relaxed text-base lg:text-lg">{industry.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Additional Industries Line */}
          <div className="additional-industries">
            Also serving: Doctors · Dentists · Med Spas · Attorneys · Pet Services
          </div>
        </div>
      </div>
    </section>
  )
}
