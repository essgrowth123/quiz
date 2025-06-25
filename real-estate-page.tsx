"use client"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users, Home } from "lucide-react"
import { StandardizedHeader } from "./components/standardized-header"
import { StandardizedHero } from "./components/standardized-hero"
import { StandardizedFooter } from "./components/standardized-footer"
import { PrimaryCTA } from "./components/standardized-cta"
import { useConversionTracking } from "./hooks/use-conversion-tracking"
import { analytics } from "./lib/analytics"

export default function RealEstatePage() {
  const { trackFormSubmit, trackCalendlyClick } = useConversionTracking("real-estate")

  useEffect(() => {
    analytics.track({
      page: "real-estate",
      event: "page_view",
    })
  }, [])

  const handleCTAClick = () => {
    trackCalendlyClick()
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  const heroData = {
    industry: "real-estate",
    headline: (
      <>
        For Real Estate Agents:{" "}
        <span className="inline-block px-2 py-1 rounded" style={{ backgroundColor: "#FFCC00", color: "#333333" }}>
          CLOSE
        </span>{" "}
        More Deals Faster
      </>
    ),
    subheadline:
      "Struggling to convert leads into listings and sales? We teach real estate professionals the exact scripts, systems, and strategies to turn prospects into clients and close deals consistently.",
    benefits: [
      "Master listing presentations that win every time",
      "Handle buyer objections with confidence",
      "Build a referral system that generates leads automatically",
      "Create urgency that motivates clients to act now",
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
                How We Help Real Estate Agents Win More Listings
              </h2>
              <p
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: "#666666",
                }}
              >
                Our proven strategies help agents build trust, overcome objections, and close deals faster.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "More Listings",
                  description: "Win listing presentations with confidence using our proven scripts and strategies.",
                },
                {
                  icon: DollarSign,
                  title: "Higher Commissions",
                  description: "Close deals faster and at better prices with advanced negotiation techniques.",
                },
                {
                  icon: Users,
                  title: "Referral System",
                  description: "Build a referral machine that generates leads automatically from past clients.",
                },
                {
                  icon: Home,
                  title: "Market Domination",
                  description: "Become the go-to agent in your area with systematic lead generation strategies.",
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
