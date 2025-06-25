import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { BackToIndustries } from "@/components/ui/back-to-industries"
import { TrendingUp, DollarSign, Users, Car } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auto Detailing Sales Training | Engineered Success Sales",
  description:
    "Sales training for auto detailing professionals. Learn to attract luxury car owners, charge premium rates, and build recurring revenue.",
}

export default function AutoDetailingPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/#industries" },
    { label: "Auto Detailing Businesses" },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Luxury Clients",
      description: "Attract owners of luxury and exotic cars who value perfection and pay premium rates.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Premium Services",
      description: "Charge $500-2000+ for paint correction, ceramic coatings, and premium detailing packages.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Recurring Revenue",
      description: "Build monthly maintenance packages for consistent, predictable income.",
      color: "yellow" as const,
    },
    {
      icon: Car,
      title: "Expert Status",
      description: "Position yourself as the go-to expert for high-end vehicle care and protection.",
      color: "blue" as const,
    },
  ]

  const testimonials = [
    {
      name: "Carlos Martinez",
      title: "Owner, Elite Auto Detailing",
      content:
        "I went from $50 wash jobs to $1,500 ceramic coating packages. ESS showed me how to attract the right customers.",
      image: "/placeholder.svg?height=80&width=80&text=CM",
    },
    {
      name: "David Park",
      title: "Mobile Detailing Pro",
      content: "My monthly recurring clients pay me $300/month each. I have a waiting list of luxury car owners now.",
      image: "/placeholder.svg?height=80&width=80&text=DP",
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
              <strong>Auto Detailing Professionals:</strong> You're competing with $20 car washes when you should be
              attracting luxury car owners who pay $500-2000+ for perfection. If you're tired of chasing "just looking"
              leads and want to build a premium detailing business, this audit will show you the way.
            </p>
          </div>
        </div>
      </section>

      <HeroSection
        industry="auto-detailing"
        headline="For Auto Detailing: Premium Services, Premium Prices"
        subheadline="Stop competing with $20 car washes. Our specialized training helps detailing professionals attract luxury car owners who pay premium prices for perfection and protection."
        benefits={[
          "Stop chasing 'just looking' leads and attract serious buyers",
          "Attract luxury car owners who value perfection over price",
          "Charge premium rates for paint correction & ceramic coatings",
          "Build recurring monthly maintenance clients for steady income",
          "Position yourself as the expert, not just another detailer",
        ]}
        formTitle="Ready to Build Your Premium Detailing Business?"
        formDescription="Get the system that attracts high-end car enthusiasts."
        businessLabel="Detailing Business Name"
      />

      <BenefitsSection
        title="How We Help Detailers Build Premium Businesses"
        subtitle="Our proven strategies help detailing professionals attract luxury clients and charge premium rates for expert-level service."
        benefits={benefits}
      />

      {/* Trust Bar */}
      <section className="py-8 bg-white-smoke">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-construction-yellow">
              <p className="text-steel-grey mb-4">
                <strong>"I went from $50 wash jobs to $1,500 ceramic coating packages."</strong>
              </p>
              <p className="text-sm text-steel-grey">— Carlos, Elite Auto Detailing</p>
            </div>
            <div className="mt-8">
              <Link href="/book" className="btn-primary text-lg px-8 py-4">
                📞 Book My Free Audit – ($297 Value)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection title="Auto Detailing Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
