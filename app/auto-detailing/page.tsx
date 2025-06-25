import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav"
import { BackToIndustries } from "@/components/ui/back-to-industries"
import { TrendingUp, DollarSign, Users, Car } from "lucide-react"
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

      <HeroSection
        industry="auto-detailing"
        headline="For Auto Detailing: Premium Services, Premium Prices"
        subheadline="Stop competing with $20 car washes. Our specialized training helps detailing professionals attract luxury car owners who pay premium prices for perfection and protection."
        benefits={[
          "Attract luxury car owners who value perfection",
          "Charge premium rates for paint correction & ceramic coatings",
          "Build recurring monthly maintenance clients",
          "Stop competing with cheap car washes",
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

      <TestimonialsSection title="Auto Detailing Success Stories" testimonials={testimonials} />

      <Footer />
    </div>
  )
}
