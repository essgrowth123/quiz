import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { BackToIndustries } from "@/components/ui/back-to-industries"
import { TrendingUp, DollarSign, Users, Leaf } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Landscaping Sales Training | Engineered Success Sales",
  description:
    "Sales training for landscaping professionals. Learn to sell design services, win commercial contracts, and build recurring maintenance revenue.",
}

export default function LandscapingPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/#industries" },
    { label: "Landscaping & Exterior Services" },
  ]

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
      <BreadcrumbNav items={breadcrumbItems} />

      <BackToIndustries />

      {/* Pain Point Intro */}
      <section className="py-8 bg-white-smoke">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-steel-grey leading-relaxed">
              <strong>Landscaping & Exterior Service Pros:</strong> You're stuck in the seasonal hustle, competing on
              price for basic lawn care when you could be selling year-round design projects and commercial contracts.
              If you want to transform from a lawn service to a landscape design expert, this audit is your roadmap.
            </p>
          </div>
        </div>
      </section>

      <HeroSection
        industry="landscaping"
        headline="For Landscaping: Grow Your Business Year-Round"
        subheadline="Stop being seen as just a lawn service. Our specialized training helps landscaping professionals sell design services, win commercial contracts, and build recurring revenue that sustains your business through every season."
        benefits={[
          "Fill weekly spots without daily DMs or constant prospecting",
          "Sell comprehensive landscape design projects with confidence",
          "Win lucrative commercial maintenance contracts worth $50K-200K+",
          "Build recurring revenue for year-round cash flow stability",
          "Position yourself as a landscape design expert, not just lawn care",
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

      {/* Trust Bar */}
      <section className="py-8 bg-white-smoke">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-construction-yellow">
              <p className="text-steel-grey mb-4">
                <strong>"My seasonal struggles are over—now I have year-round contracts."</strong>
              </p>
              <p className="text-sm text-steel-grey">— Roberto, Commercial Landscaping</p>
            </div>
            <div className="mt-8">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                📞 Book My Free Audit – ($297 Value)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection title="Landscaping Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
