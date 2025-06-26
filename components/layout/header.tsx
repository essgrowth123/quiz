"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

const industries = [
  { name: "Real Estate", href: "/real-estate" },
  { name: "Contractors", href: "/contractors" },
  { name: "Auto Detailing", href: "/auto-detailing" },
  { name: "Landscaping", href: "/landscaping" },
  { name: "HVAC", href: "/hvac" },
  { name: "Medical", href: "/medical" },
  { name: "Automotive", href: "/automotive" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleCTAClick = () => {
    window.open("https://calendly.com/essgrowth/30min", "_blank")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/placeholder.svg?height=60&width=200&text=ESS+Logo"
              alt="Engineered Success Sales"
              width={200}
              height={60}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
              >
                <span>Industries</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <div className="py-2">
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="primary" size="lg" onClick={handleCTAClick} className="text-sm">
              📞 Book My Free Audit – ($297 Value)
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <p className="font-medium text-gray-900 px-4">Industries</p>
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>

              <div className="px-4 pt-4 border-t">
                <Button variant="primary" size="xl" onClick={handleCTAClick} className="w-full text-sm">
                  📞 Book My Free Audit – ($297 Value)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
