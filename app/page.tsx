import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { WhoWeHelped } from "@/components/sections/who-we-helped"
import { TestimonialBar } from "@/components/sections/testimonial-bar"
import { IndustrySelection } from "@/components/sections/industry-selection"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ExitIntentModal } from "@/components/ui/exit-intent-modal"
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
        headline="🚨 If You're Chasing Leads or Losing Quotes—This Audit Will Show You Why"
        subheadline="Whether you're in trades, real estate, med spas, or law—you shouldn't be guessing where your sales are leaking. Our 30-minute ESS Sales Leak Audit ($297 value) gives you clarity, not fluff."
        benefits={[
          "✅ Designed for service businesses: from contractors to closers",
          "✅ No tech stack required—just bring how you sell today",
          "✅ We'll show you what's broken and what to fix next",
        ]}
        formTitle="Ready to Transform Your Sales?"
        formDescription="Get the sales system that works for your industry."
        businessLabel="Business Name"
      />

      <BenefitsSection
        title="What You'll Walk Away With"
        subtitle="Our proven strategies help business owners convert more leads, charge premium rates, and build lasting customer relationships."
        benefits={benefits}
      />

      <WhoWeHelped />

      <TestimonialBar />

      <div id="industries">
        <IndustrySelection />
      </div>

      <TestimonialsSection title="Success Stories from Real Business Owners" testimonials={testimonials} />

      <Footer />

      <ExitIntentModal />
    </div>
  )
}
