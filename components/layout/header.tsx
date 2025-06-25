"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

const industries = [
  { name: "Real Estate", href: "/real-estate" },
  { name: "Contractors", href: "/contractors" },
  { name: "Auto Detailing", href: "/auto-detailing" },
  { name: "Landscaping", href: "/landscaping" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToIndustries = () => {
    const industriesSection = document.getElementById("industries")
    if (industriesSection) {
      industriesSection.scrollIntoView({ behavior: "smooth" })
    }
    closeDropdown()
    closeMenu()
  }

  return (
    <header className="bg-ess-blue shadow-lg sticky top-0 z-50">
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/ess-logo-light.png"
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
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-white hover:text-construction-yellow font-medium transition-colors duration-200"
              >
                <span>Industries</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-50">
                  <div className="py-2">
                    <button
                      onClick={scrollToIndustries}
                      className="block w-full text-left px-4 py-2 text-sm text-steel-grey hover:bg-white-smoke hover:text-ess-blue transition-colors duration-200"
                    >
                      View All Industries
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        className="block px-4 py-2 text-sm text-steel-grey hover:bg-white-smoke hover:text-ess-blue transition-colors duration-200"
                        onClick={closeDropdown}
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
            <Link href="/book" className="btn-primary text-sm px-6 py-3">
              📞 Book My Free Audit – ($297 Value)
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 text-white">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-800 bg-ess-blue">
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <p className="font-medium text-white px-4">Industries</p>
                <button
                  onClick={scrollToIndustries}
                  className="block w-full text-left px-6 py-2 text-construction-yellow hover:bg-blue-800 transition-colors duration-200"
                >
                  View All Industries
                </button>
                {industries.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="block px-6 py-2 text-white hover:bg-blue-800 hover:text-construction-yellow transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>

              <div className="px-4 pt-4 border-t border-blue-800">
                <Link href="/book" className="btn-primary w-full text-center block py-3" onClick={closeMenu}>
                  📞 Book My Free Audit – ($297 Value)
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
