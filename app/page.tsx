"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AutomotiveDealershipPage from "../automotive-dealership-page"
import LimoServicePage from "../limo-service-page"
import RealEstatePage from "../real-estate-page"
import HVACPage from "../hvac-page"
import MedicalPage from "../medical-page"
import { AnalyticsDashboard } from "../components/analytics-dashboard"
import DentistPage from "../dentist-page"
import DogWalkerPage from "../dog-walker-page"
import HomeCleaningPage from "../home-cleaning-page"
import DogTrainingPage from "../dog-training-page"
import CarDetailingPage from "../car-detailing-page"
import PersonalTrainerPage from "../personal-trainer-page"
import BarberPage from "../barber-page"
import BrandIntroPage from "../brand-intro-page"
import { LeadCapturePopup } from "../components/lead-capture-popup"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { TrendingUp, DollarSign, Users, Target } from "lucide-react"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<
    | "blue-collar"
    | "automotive"
    | "limo"
    | "real-estate"
    | "hvac"
    | "medical"
    | "dentist"
    | "dog-walker"
    | "home-cleaning"
    | "dog-training"
    | "car-detailing"
    | "personal-trainer"
    | "barber"
  >("blue-collar")
  const [showBrandIntro, setShowBrandIntro] = useState(true)
  const [showPageSwitcher, setShowPageSwitcher] = useState(false)
  const [showIntakeForm, setShowIntakeForm] = useState(false)

  useEffect(() => {
    // If not showing brand intro, set a default page
    if (!showBrandIntro && !currentPage) {
      setCurrentPage("blue-collar")
    }
  }, [showBrandIntro, currentPage])

  const handleIndustrySelect = (industry: string) => {
    setCurrentPage(industry as any)
    setShowBrandIntro(false)
  }

  const stickyActions = (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {/* Primary CTA - Call Now */}
      <Button
        onClick={() => window.open("https://calendly.com/essgrowth/30min", "_blank")}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-4 py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
      >
        📞 Call Now
      </Button>

      {/* Secondary CTA - Intake Form */}
      <Button
        onClick={() => setShowIntakeForm(true)}
        variant="outline"
        className="bg-white hover:bg-gray-50 text-slate-800 font-semibold px-4 py-2 rounded-lg shadow-lg border-2 border-slate-300 transition-all duration-200 hover:scale-105"
      >
        📋 Get Started
      </Button>

      {/* Industry Switcher */}
      <Button
        onClick={() => setShowPageSwitcher(!showPageSwitcher)}
        variant="outline"
        className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-3 py-2 rounded-lg shadow-lg border border-slate-600 text-sm"
      >
        🏢 Other Industries
      </Button>
    </div>
  )

  const pageSwitcher = (
    <>
      {/* Collapsible Menu */}
      {showPageSwitcher && (
        <div className="fixed top-60 right-4 z-40 bg-slate-800 rounded-lg shadow-2xl p-4 max-w-xs border border-slate-700">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">Find Your Industry</span>
            </div>
            <Button
              onClick={() => setShowPageSwitcher(false)}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              onClick={() => {
                setCurrentPage("blue-collar")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "blue-collar"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Blue-Collar
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("automotive")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "automotive"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Auto
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("limo")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "limo"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Limo
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("real-estate")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "real-estate"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Real Estate
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("hvac")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "hvac"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              HVAC
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("medical")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "medical"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Medical
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("dentist")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "dentist"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Dentist
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("dog-walker")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "dog-walker"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Dog Walker
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("home-cleaning")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "home-cleaning"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Home Cleaning
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("dog-training")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "dog-training"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Dog Training
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("car-detailing")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "car-detailing"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Car Detailing
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("personal-trainer")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "personal-trainer"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Personal Trainer
            </Button>
            <Button
              onClick={() => {
                setCurrentPage("barber")
                setShowPageSwitcher(false)
              }}
              size="sm"
              className={`text-xs px-2 py-1.5 rounded transition-all duration-200 ${
                currentPage === "barber"
                  ? "bg-orange-400 text-slate-800 font-semibold shadow-lg"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              }`}
            >
              Barber
            </Button>
          </div>
        </div>
      )}
    </>
  )

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

  if (showBrandIntro) {
    return <BrandIntroPage onIndustrySelect={handleIndustrySelect} />
  }

  if (currentPage === "medical") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <MedicalPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="medical" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "hvac") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <HVACPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="hvac" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "real-estate") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <RealEstatePage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="real-estate" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "limo") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <LimoServicePage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="limo" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "automotive") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <AutomotiveDealershipPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="automotive" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "home-cleaning") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <HomeCleaningPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="home-cleaning" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "dog-walker") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <DogWalkerPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="dog-walker" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "dentist") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <DentistPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="dentist" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "dog-training") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <DogTrainingPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="dog-training" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "car-detailing") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <CarDetailingPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="car-detailing" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

  if (currentPage === "personal-trainer") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <PersonalTrainerPage />
        <AnalyticsDashboard />
        <LeadCapturePopup
          industry="personal-trainer"
          isOpen={showIntakeForm}
          onClose={() => setShowIntakeForm(false)}
        />
      </div>
    )
  }

  if (currentPage === "barber") {
    return (
      <div>
        {stickyActions}
        {pageSwitcher}
        <BarberPage />
        <AnalyticsDashboard />
        <LeadCapturePopup industry="barber" isOpen={showIntakeForm} onClose={() => setShowIntakeForm(false)} />
      </div>
    )
  }

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
