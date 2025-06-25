"use client"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Wrench } from "lucide-react"
import { StandardizedHeader } from "./components/standardized-header"
import { StandardizedHero } from "./components/standardized-hero"
import { StandardizedFooter } from "./components/standardized-footer"
import { PrimaryCTA } from "./components/standardized-cta"
import { useConversionTracking } from "./hooks/use-conversion-tracking"
import { analytics } from "./lib/analytics"

export default function ESSLandingPage() {
  const { trackFormSubmit, trackCalendlyClick } = useConversionTracking("blue-collar")

  useEffect(() => {
    analytics.track({
      page: "blue-collar",
      event: "page_view",
    })
  }, [])

  const handleCTAClick = () => {
    trackCalendlyClick()
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  const heroData = {
    industry: "blue-collar",
    headline: (
      <>
        For Blue-Collar Businesses:{" "}
        <span className="inline-block px-2 py-1 rounded" style={{ backgroundColor: "#FFCC00", color: "#333333" }}>
          MASTER
        </span>{" "}
        Sales Conversations
      </>
    ),
    subheadline:
      "Tired of competing on price alone? We help blue-collar business owners learn the exact words and strategies to sell value, build trust, and close more deals at higher prices.",
    benefits: [
      "Stop competing on price and start selling value",
      "Handle objections with confidence and professionalism",
      "Build trust and rapport with every customer",
      "Turn estimates into signed contracts consistently",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <StandardizedHeader />

      <StandardizedHero
        industry={heroData.industry}
        headline={heroData.headline}
        subheadline={heroData.subheadline}
        benefits={heroData.benefits}
        onCTAClick={handleCTAClick}
      />

      {/* Benefits Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  color: "#333333",
                }}
              >
                How We Help Blue-Collar Businesses Win More Jobs
              </h2>
              <p
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                Our proven strategies help contractors and service providers sell value, not just price.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Higher Prices",
                  description: "Stop competing on price and start selling the value of quality workmanship.",
                },
                {
                  icon: DollarSign,
                  title: "More Profit",
                  description: "Increase your profit margins by positioning yourself as the premium choice.",
                },
                {
                  icon: Users,
                  title: "Better Clients",
                  description: "Attract customers who value quality work and pay on time.",
                },
                {
                  icon: Wrench,
                  title: "Professional Image",
                  description: "Present yourself as the expert professional that customers trust.",
                },
              ].map((benefit, index) => (
                <Card
                  key={index}
                  className="text-center p-4 sm:p-6 shadow-lg border-0 hover:shadow-xl transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">
                      <benefit.icon
                        className="w-10 h-10 sm:w-12 sm:h-12"
                        style={{ color: index % 2 === 0 ? "#FFCC00" : "#003366" }}
                      />
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold mb-3"
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        color: "#333333",
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        color: "#666666",
                      }}
                    >
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-8 sm:mt-12">
              <PrimaryCTA onClick={handleCTAClick} />
            </div>
          </div>
        </div>
      </section>

      <StandardizedFooter />
    </div>
  )
}
