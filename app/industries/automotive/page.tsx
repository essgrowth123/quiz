import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Car } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automotive Sales Training | Engineered Success Sales",
  description:
    "Sales training for automotive dealerships. Learn to overcome objections, build rapport with car buyers, and close more deals at premium prices.",
}

export default function AutomotivePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "More Sales",
      description: "Equip your sales team with proven techniques to close more deals on the showroom floor.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Margins",
      description: "Optimize your sales process to maximize every customer interaction and upsell opportunity.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Team Confidence",
      description:
        "Provide your team with the confidence and skills to handle objections and guide customers to a 'yes'.",
      color: "yellow" as const,
    },
    {
      icon: Car,
      title: "Customer Experience",
      description:
        "Train your staff to build rapport and trust, leading to higher customer satisfaction and referrals.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="automotive"
        headline="For Auto Dealerships: Master Sales Conversations"
        subheadline="Stop losing deals to competitors. Our specialized training equips your sales team with the exact words and strategies to guide customers to a 'yes' and close more deals at premium prices."
        benefits={[
          "Overcome common automotive sales objections with ease",
          "Build instant rapport and trust with car buyers",
          "Structure compelling vehicle presentations that sell",
          "Drive consistent, high-value automotive sales",
        ]}
        formTitle="Ready to Empower Your Sales Team?"
        formDescription="Get the automotive sales training that transforms your dealership."
        businessLabel="Dealership Name"
      />

      <BenefitsSection
        title="How We Transform Automotive Sales Teams"
        subtitle="Our specialized training focuses on practical, actionable strategies for immediate impact on your showroom floor."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
