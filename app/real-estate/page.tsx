import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { BackToIndustries } from "@/components/ui/back-to-industries"
import { TrendingUp, DollarSign, Users, Home } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Estate Sales Training | Engineered Success Sales",
  description:
    "Specialized sales training for real estate professionals. Learn to close more deals, build lasting client relationships, and dominate your local market.",
}

export default function RealEstatePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/#industries" },
    { label: "Real Estate Pros" },
  ]

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

  const testimonials = [
    {
      name: "Sarah Mitchell",
      title: "Real Estate Agent, Keller Williams",
      content:
        "ESS helped me triple my listings in 6 months. I went from chasing leads to having clients call me directly.",
      image: "/placeholder.svg?height=80&width=80&text=SM",
    },
    {
      name: "Mike Rodriguez",
      title: "Broker, Century 21",
      content:
        "The referral system they taught me generates 70% of my business now. I haven't cold-called in over a year.",
      image: "/placeholder.svg?height=80&width=80&text=MR",
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
              <strong>Real estate agents:</strong> You're losing listings to agents who respond faster, follow up
              consistently, and position themselves as market experts—not just another salesperson. If you're tired of
              "let me think about it" and want to become the agent clients choose first, this audit is for you.
            </p>
          </div>
        </div>
      </section>

      <HeroSection
        industry="real-estate"
        headline="For Real Estate Agents: Dominate Your Local Market"
        subheadline="Stop chasing leads and start attracting quality clients. Our specialized training helps real estate professionals build a thriving practice with premium listings and loyal clients who refer their friends."
        benefits={[
          "Speed up lead response time and double your callback rates",
          "Convert more leads into signed listing agreements",
          "Build a referral network that brings you quality clients automatically",
          "Position yourself as the premium agent in your area",
          "Create systems for consistent, predictable income year-round",
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

      {/* Trust Bar */}
      <section className="py-8 bg-white-smoke">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-construction-yellow">
              <p className="text-steel-grey mb-4">
                <strong>"We doubled our booked estimates in 14 days."</strong>
              </p>
              <p className="text-sm text-steel-grey">— Sarah, Real Estate Agent</p>
            </div>
            <div className="mt-8">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                📞 Book My Free Audit – ($297 Value)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection title="Real Estate Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
