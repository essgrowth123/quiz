import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"

export default function HomePage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Proven strategies that help businesses increase their sales by 40-60% within 90 days.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Profits",
      description: "Learn to sell value instead of competing on price, dramatically improving your profit margins.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Better Teams",
      description: "Transform your sales team with confidence-building training and proven methodologies.",
      color: "yellow" as const,
    },
    {
      icon: Target,
      title: "Consistent Results",
      description: "Implement systems that deliver predictable, repeatable sales success month after month.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="general"
        headline="Transform Your Sales Team Into Revenue-Generating Machines"
        subheadline="Stop losing deals to competitors who charge less. Our proven sales training helps businesses across all industries sell value, build trust, and close more deals at premium prices."
        benefits={[
          "Increase your sales by 40-60% within 90 days",
          "Stop competing on price and start selling value",
          "Build a confident, high-performing sales team",
          "Create predictable, repeatable sales success",
        ]}
        formTitle="Ready to Transform Your Sales?"
        formDescription="Get the sales training that turns prospects into paying customers."
        businessLabel="Business Name"
      />

      <BenefitsSection
        title="How We Help Businesses Dominate Their Markets"
        subtitle="Our proven methodologies have helped thousands of businesses across every industry achieve breakthrough sales results."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
