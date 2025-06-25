import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sales Training That Actually Works | Engineered Success Sales",
  description:
    "Stop losing leads and start closing more deals. Specialized sales training for contractors, real estate agents, and service professionals.",
}

export default function HomePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "More Qualified Leads",
      description: "Stop chasing unqualified prospects and attract clients ready to buy.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Close Rates",
      description: "Convert more leads into paying customers with proven sales systems.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Premium Pricing",
      description: "Stop competing on price and start selling value and expertise.",
      color: "yellow" as const,
    },
    {
      icon: Target,
      title: "Predictable Revenue",
      description: "Build systems that generate consistent, predictable income month after month.",
      color: "blue" as const,
    },
  ]

  const testimonials = [
    {
      name: "Mike Rodriguez",
      title: "Contractor, Rodriguez Construction",
      content:
        "I stopped bidding against low-ballers and started winning $50K+ projects. My profit margins doubled in 4 months.",
      image: "/placeholder.svg?height=80&width=80&text=MR",
    },
    {
      name: "Sarah Mitchell",
      title: "Real Estate Agent",
      content:
        "ESS helped me triple my listings in 6 months. I went from chasing leads to having clients call me directly.",
      image: "/placeholder.svg?height=80&width=80&text=SM",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="general"
        headline="Stop Losing Leads. Start Closing More Deals."
        subheadline="Specialized sales training for contractors, real estate agents, and service professionals who want to stop competing on price and start building profitable, sustainable businesses."
        benefits={[
          "Convert more leads into paying customers",
          "Stop competing on price and start selling value",
          "Build predictable revenue systems that work",
          "Position yourself as the expert in your field",
        ]}
        formTitle="Ready to Transform Your Sales?"
        formDescription="Get the sales training that helps you sell value, not just price."
        businessLabel="Business Name"
      />

      <BenefitsSection
        title="How We Help Service Professionals Build Thriving Businesses"
        subtitle="Our proven strategies help you attract quality clients, charge premium rates, and build lasting success."
        benefits={benefits}
      />

      <TestimonialsSection title="Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
