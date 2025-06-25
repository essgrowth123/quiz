import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { IndustrySelection } from "@/components/sections/industry-selection"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sales Training for Blue-Collar Businesses | Engineered Success Sales",
  description:
    "Stop losing leads and start closing more deals. Specialized sales training for contractors, real estate agents, auto detailers, and service businesses.",
}

export default function HomePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "More Conversions",
      description: "Turn more leads into paying customers with proven sales systems.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Profits",
      description: "Stop competing on price and start selling value and expertise.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Better Relationships",
      description: "Build trust with customers and create lasting business relationships.",
      color: "yellow" as const,
    },
    {
      icon: Target,
      title: "Proven Systems",
      description: "Get sales processes that work for blue-collar and service businesses.",
      color: "blue" as const,
    },
  ]

  const testimonials = [
    {
      name: "Mike Thompson",
      title: "HVAC Contractor",
      content: "ESS helped me stop losing bids to low-ballers. I now win 80% of my quotes and charge premium rates.",
      image: "/placeholder.svg?height=80&width=80&text=MT",
    },
    {
      name: "Jessica Rodriguez",
      title: "Real Estate Agent",
      content: "The referral system they taught me generates most of my business now. I haven't cold-called in months.",
      image: "/placeholder.svg?height=80&width=80&text=JR",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="general"
        headline="Stop Losing Leads. Start Closing More Deals."
        subheadline="Specialized sales training for blue-collar businesses and service professionals. Learn the systems that turn leads into loyal customers who pay premium rates."
        benefits={[
          "Convert more leads into paying customers",
          "Stop competing on price and start selling value",
          "Build systems for consistent, predictable revenue",
          "Create customer relationships that generate referrals",
        ]}
        formTitle="Ready to Transform Your Sales?"
        formDescription="Get the sales system that works for your industry."
        businessLabel="Business Name"
      />

      <BenefitsSection
        title="How We Help Service Businesses Close More Deals"
        subtitle="Our proven strategies help business owners convert more leads, charge premium rates, and build lasting customer relationships."
        benefits={benefits}
      />

      <div id="industries">
        <IndustrySelection />
      </div>

      <TestimonialsSection title="Success Stories from Real Business Owners" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
