// This is a Server Component
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Thermometer } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HVAC Sales Training | Engineered Success Sales",
  description:
    "Sales training for HVAC professionals. Learn to sell system replacements, position premium solutions, and turn service calls into major installations.",
}

export default function HVACPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "System Sales",
      description: "Turn service calls into system replacements and major installations.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Premium Solutions",
      description: "Position yourself as the expert and stop competing on price alone.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Customer Trust",
      description: "Build trust and position yourself as the HVAC expert they need.",
      color: "yellow" as const,
    },
    {
      icon: Thermometer,
      title: "Comfort Solutions",
      description: "Present solutions that solve problems and improve home comfort.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="hvac"
        headline="For HVAC Companies: Sell High-Value Systems"
        subheadline="Stop competing on price alone. Our specialized training helps HVAC professionals position premium solutions, sell system upgrades confidently, and turn service calls into major installations."
        benefits={[
          "Sell system replacements instead of just repairs",
          "Position yourself as the premium HVAC expert",
          "Handle price objections with confidence",
          "Turn emergency calls into planned upgrades",
        ]}
        formTitle="Ready to Sell Premium HVAC?"
        formDescription="Get the sales training that turns service calls into major sales."
        businessLabel="HVAC Company Name"
      />

      <BenefitsSection
        title="How We Help HVAC Companies Sell More Systems"
        subtitle="Our proven strategies help HVAC professionals sell value, not just price, and build trust with homeowners."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
