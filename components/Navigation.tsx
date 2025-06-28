"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const industries = [
    { name: "Healthcare", path: "/industries/healthcare" },
    { name: "Construction", path: "/industries/construction" },
    { name: "Real Estate", path: "/industries/real-estate" },
    { name: "Home Services", path: "/industries/home-services" },
    { name: "Manufacturing", path: "/industries/manufacturing" },
    { name: "Automotive", path: "/industries/automotive" },
  ]

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src="/images/ess-logo.png" alt="Engineered Success Sales" className="h-14 w-auto" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className={`text-gray-600 hover:text-gray-900 transition-colors ${
            location.pathname === "/" ? "text-gray-900 font-semibold" : ""
          }`}
        >
          Home
        </Link>

        {/* Industries Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Industries
            <ChevronDown className={`w-4 h-4 transition-transform ${isIndustriesOpen ? "rotate-180" : ""}`} />
          </button>

          {isIndustriesOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
              {industries.map((industry) => (
                <Link
                  key={industry.path}
                  to={industry.path}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setIsIndustriesOpen(false)}
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/book">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6">BOOK MY FREE AUDIT - ($297 VALUE)</Button>
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2">
              <div className="text-gray-600 font-medium">Industries:</div>
              {industries.map((industry) => (
                <Link
                  key={industry.path}
                  to={industry.path}
                  className="block pl-4 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {industry.name}
                </Link>
              ))}
            </div>

            <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                BOOK MY FREE AUDIT - ($297 VALUE)
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
