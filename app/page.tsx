"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ESSLandingPage from "../landing-page"
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
  const pageSwitcher = (
    <div className="fixed top-4 right-4 z-50 bg-slate-800 rounded-lg shadow-2xl p-3 max-w-xs border border-slate-700">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-600">
        <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">ESS Industries</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          onClick={() => setCurrentPage("blue-collar")}
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
          onClick={() => setCurrentPage("automotive")}
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
          onClick={() => setCurrentPage("limo")}
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
          onClick={() => setCurrentPage("real-estate")}
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
          onClick={() => setCurrentPage("hvac")}
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
          onClick={() => setCurrentPage("medical")}
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
          onClick={() => setCurrentPage("dentist")}
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
          onClick={() => setCurrentPage("dog-walker")}
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
          onClick={() => setCurrentPage("home-cleaning")}
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
          onClick={() => setCurrentPage("dog-training")}
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
          onClick={() => setCurrentPage("car-detailing")}
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
          onClick={() => setCurrentPage("personal-trainer")}
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
          onClick={() => setCurrentPage("barber")}
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
  )

  if (currentPage === "medical") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <MedicalPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "hvac") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <HVACPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "real-estate") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <RealEstatePage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "limo") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <LimoServicePage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "automotive") {
    return (
      <div>
        {/* Page Switcher with updated button */}
        {pageSwitcher}
        <AutomotiveDealershipPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "home-cleaning") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <HomeCleaningPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "dog-walker") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <DogWalkerPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "dentist") {
    return (
      <div>
        {/* Page Switcher */}
        {pageSwitcher}
        <DentistPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "dog-training") {
    return (
      <div>
        {/* Navigation with all buttons */}
        {pageSwitcher}
        <DogTrainingPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "car-detailing") {
    return (
      <div>
        {/* Navigation with all buttons */}
        {pageSwitcher}
        <CarDetailingPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "personal-trainer") {
    return (
      <div>
        {/* Navigation with all buttons */}
        {pageSwitcher}
        <PersonalTrainerPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  if (currentPage === "barber") {
    return (
      <div>
        {/* Navigation with all buttons */}
        {pageSwitcher}
        <BarberPage />
        <AnalyticsDashboard />
      </div>
    )
  }

  return (
    <div>
      {/* Page Switcher */}
      {pageSwitcher}
      <ESSLandingPage />
      <AnalyticsDashboard />
    </div>
  )
}
