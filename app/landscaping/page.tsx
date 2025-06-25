import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TrendingUp, DollarSign, Users, Leaf } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Landscaping Sales Training | Engineered Success Sales",
  description:
    "Sales training for landscaping professionals. Learn to sell design services, win commercial contracts, and build recurring maintenance revenue.",
}

export default function LandscapingPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Design Sales",
      description: "Sell comprehensive landscape design and installation projects with confidence.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Commercial Contracts",
      description: "Win lucrative commercial maintenance contracts and property management deals.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Maintenance Revenue",
      description: "Build recurring monthly maintenance contracts for predictable cash flow.",
      color: "yellow" as const,
    },
    {
      icon: Leaf,
      title: "Seasonal Success",
      description: "Maximize revenue across all seasons with diverse service offerings.",
      color: "blue" as const,
    },
  ]

  const testimonials = [
    {
      name: "Jennifer Walsh",
      title: "Owner, Green Thumb Landscaping",
      content:
        "I transformed from a lawn service to a design company. Now I sell $25K landscape installations regularly.",
      image: "/placeholder.svg?height=80&width=80&text=JW",
    },
    {
      name: "Roberto Silva",
      title: "Commercial Landscaping",
      content:
        "ESS helped me land three major commercial contracts worth $180K annually. My seasonal struggles are over.",
      image: "/placeholder.svg?height=80&width=80&text=RS",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="landscaping"
        headline="For Landscaping: Grow Your Business Year-Round"
        subheadline="Stop being seen as just a lawn service. Our specialized training helps landscaping professionals sell design services, win commercial contracts, and build recurring revenue that sustains your business through every season."
        benefits={[
          "Sell comprehensive landscape design projects",
          "Win lucrative commercial maintenance contracts",
          "Build recurring revenue for year-round cash flow",
          "Position yourself as a landscape design expert",
        ]}
        formTitle="Ready to Grow Your Landscaping Empire?"
        formDescription="Get the system that transforms seasonal work into year-round success."
        businessLabel="Landscaping Company Name"
      />

      <BenefitsSection
        title="How We Help Landscapers Build Year-Round Success"
        subtitle="Our proven strategies help landscaping professionals diversify services, win premium contracts, and build sustainable businesses."
        benefits={benefits}
      />

      <TestimonialsSection title="Landscaping Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
