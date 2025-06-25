// This is a Server Component
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Home } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Estate Sales Training | Engineered Success Sales",
  description:
    "Specialized sales training for real estate professionals. Learn to close more deals, build lasting client relationships, and dominate your local market.",
}

export default function RealEstatePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "More Listings",
      description: "Attract quality listings and convert leads into signed agreements with confidence.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Commissions",
      description: "Position yourself as a premium agent and command higher commission rates.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Client Loyalty",
      description: "Build lasting relationships that generate referrals and repeat business for life.",
      color: "yellow" as const,
    },
    {
      icon: Home,
      title: "Market Dominance",
      description: "Become the go-to agent in your area with proven prospecting and closing strategies.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="real-estate"
        headline="For Real Estate Agents: Dominate Your Local Market"
        subheadline="Stop chasing leads and start attracting quality clients. Our specialized training helps real estate professionals build a thriving practice with premium listings and loyal clients who refer their friends."
        benefits={[
          "Convert more leads into signed listing agreements",
          "Build a referral network that brings you quality clients",
          "Position yourself as the premium agent in your area",
          "Create systems for consistent, predictable income",
        ]}
        formTitle="Ready to Dominate Your Market?"
        formDescription="Get the real estate sales system that builds lasting success."
        businessLabel="Brokerage Name"
      />

      <BenefitsSection
        title="How We Help Real Estate Agents Build Thriving Practices"
        subtitle="Our proven strategies help agents attract quality listings, close more deals, and build lasting client relationships."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
