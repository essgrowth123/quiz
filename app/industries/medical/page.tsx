// This is a Server Component

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medical Practice Sales Training | Engineered Success Sales",
  description:
    "Sales training for medical and dental practices. Learn to attract quality patients, increase treatment acceptance, and build patient loyalty.",
}

export default function MedicalPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "More Patients",
      description: "Fill your schedule with quality patients who value your expertise and care.",
      color: "yellow" as const,
    },
    {
      icon: DollarSign,
      title: "Higher Case Value",
      description: "Increase treatment acceptance rates and grow your practice revenue.",
      color: "blue" as const,
    },
    {
      icon: Users,
      title: "Patient Loyalty",
      description: "Build lasting relationships that generate referrals and repeat visits.",
      color: "yellow" as const,
    },
    {
      icon: Heart,
      title: "Better Care",
      description: "Create positive experiences that turn patients into practice advocates.",
      color: "blue" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <HeroSection
        industry="medical"
        headline="For Medical Practices: Grow Your Patient Base"
        subheadline="Stop struggling with empty appointment slots. Our specialized training helps medical and dental practices attract quality patients who value preventive care and accept comprehensive treatment plans."
        benefits={[
          "Attract high-value patients who appreciate quality care",
          "Build trust and rapport during consultations",
          "Present treatment plans patients actually accept",
          "Create referral systems that grow your practice",
        ]}
        formTitle="Ready to Grow Your Practice?"
        formDescription="Get the patient acquisition system that fills your schedule."
        businessLabel="Practice Name"
      />

      <BenefitsSection
        title="How We Help Medical Practices Attract Quality Patients"
        subtitle="Our proven strategies help healthcare professionals build trust and present treatment plans patients actually accept."
        benefits={benefits}
      />

      <Footer />
    </div>
  )
}
