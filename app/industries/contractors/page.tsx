// This is a Server Component
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Hammer } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contractor Sales Training | Engineered Success Sales",
  description:
    "Sales training for contractors and home improvement professionals. Learn to sell value, handle objections, and close more high-ticket projects.",
}

export default function ContractorsPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Bigger Projects",
      description: "Win more high-value contracts and premium home improvement projects.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Premium Pricing",
      description: "Stop competing on price and start selling quality, craftsmanship, and value.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Trust Building",
      description: "Build instant rapport with homeowners and position yourself as the expert.",
      color: "yellow" as const,
    },
    {
      icon: Hammer,
      title: "Project Confidence",
      description: "Present estimates with confidence and handle objections like a pro.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="contractors"
        headline="For Contractors: Win More High-Value Projects"
        subheadline="Stop losing bids to low-ball competitors. Our specialized training helps contractors sell quality and craftsmanship, win premium projects, and build a reputation that commands top dollar."
        benefits={[
          "Win more high-ticket home improvement projects",
          "Stop competing on price and start selling value",
          "Build trust with homeowners from the first meeting",
          "Handle objections and close deals with confidence",
        ]}
        formTitle="Ready to Win Premium Projects?"
        formDescription="Get the contractor sales system that builds your reputation and revenue."
        businessLabel="Company Name"
      />

      <BenefitsSection
        title="How We Help Contractors Build Premium Businesses"
        subtitle="Our proven strategies help contractors win quality projects, charge premium rates, and build lasting client relationships."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
