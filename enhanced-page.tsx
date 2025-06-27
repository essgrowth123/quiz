"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Settings, Send, CheckCircle, Shield, Star, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"

export function EnhancedPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const photos = [
    {
      src: "/images/headshot.jpg",
      alt: "Professional Sales Consultant - Founder of Engineered Success Sales",
      caption: "Your Sales Consultant",
      description: "15+ Years Experience",
    },
    {
      src: "/images/father-son.jpg",
      alt: "Family man who understands work-life balance",
      caption: "Family First",
      description: "Building for the Future",
    },
    {
      src: "/images/job-site.jpg",
      alt: "Actually doing the work on construction sites",
      caption: "In the Trenches",
      description: "Hands-On Experience",
    },
  ]

  // Auto-rotate photos every 5 seconds (increased for better mobile UX)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [photos.length])

  // Touch gesture handling for carousel
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }
    if (isRightSwipe) {
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }
  }, [touchStart, touchEnd, photos.length])

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [mobileMenuOpen])

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Mobile Header */}
      <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src="/images/ess-logo.png" alt="Engineered Success Sales" className="h-10 sm:h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <span className="text-gray-600 text-sm font-medium">Industries</span>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-sm font-semibold rounded-md min-h-[44px]">
                BOOK MY FREE AUDIT - ($297 VALUE)
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
                className="p-2 min-h-[44px] min-w-[44px]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#industries"
                  className="text-gray-600 text-base font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Industries
                </a>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-base font-semibold rounded-md min-h-[48px] w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK MY FREE AUDIT - ($297 VALUE)
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="w-full bg-white relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src="/images/ess-logo.png"
            alt="ESS Logo Background"
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-contain"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            {/* Optimized Headlines for Mobile */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 px-2">
              Book Your Free ESS Sales Leak Audit
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-600 leading-tight mb-4 sm:mb-6">
              ($297 Value)
            </h2>

            {/* Optimized Description */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                This 30-minute call shows you exactly where your leads are slipping through the cracks—and how to fix it
                without hiring anyone new.
              </p>
            </div>

            {/* Enhanced Primary CTA */}
            <div className="mb-8 sm:mb-12 px-4">
              <Button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-lg min-h-[52px] w-full max-w-sm sm:max-w-md shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
                📋 Get My Free Sales Blueprint
              </Button>
            </div>

            {/* Enhanced Social Proof Stats */}
            <div className="max-w-5xl mx-auto px-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-1 sm:mb-2">500+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600">Businesses Helped</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-1 sm:mb-2">$2.5M+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600">Revenue Generated</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-1 sm:mb-2">98%</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mb-1 sm:mb-2">5 Years</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600">Experience</div>
                </div>
              </div>
            </div>

            {/* Enhanced Scroll Encouragement */}
            <div className="mt-12 sm:mt-16 animate-bounce">
              <div className="flex flex-col items-center text-gray-500">
                <span className="text-xs sm:text-sm font-medium mb-2">See how I've helped businesses like yours</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4 px-4">
              What You'll Walk Away With
            </h3>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">🔍 Clear Diagnosis</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Clarity on what's leaking leads or killing close rates
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">⚙️ Immediate Fix</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    A clear fix you can start applying immediately
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden transform transition-all duration-200 hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Send className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">🚀 Straight Talk</h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    No pitch. Just straight talk from someone who's scaled the systems himself
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Meet Your Consultant Section */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Enhanced Photo Section with Touch Support */}
            <div className="order-1 lg:order-2">
              <div className="text-center">
                {/* Enhanced Photo Carousel with Touch Gestures */}
                <div className="relative inline-block mb-6 sm:mb-8">
                  <div
                    className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto cursor-grab active:cursor-grabbing"
                    ref={carouselRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <img
                      src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                      alt={photos[currentPhotoIndex].alt}
                      className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-2xl transition-all duration-300"
                      loading="lazy"
                    />

                    {/* ESS Logo Badge */}
                    <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white rounded-xl shadow-xl p-2 sm:p-3">
                      <img
                        src="/images/ess-logo.png"
                        alt="ESS Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      />
                    </div>

                    {/* Enhanced Navigation Arrows */}
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Photo Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/80 text-white px-3 sm:px-4 py-2 rounded-lg">
                      <div className="font-semibold text-xs sm:text-sm">{photos[currentPhotoIndex].caption}</div>
                      <div className="text-xs opacity-90">{photos[currentPhotoIndex].description}</div>
                    </div>

                    {/* Swipe Indicator for Mobile */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:hidden">
                      Swipe to navigate
                    </div>
                  </div>

                  {/* Enhanced Dot Indicators */}
                  <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          index === currentPhotoIndex ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`View photo ${index + 1}`}
                      >
                        <span className="sr-only">Photo {index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <div className="mb-6 sm:mb-8 px-4">
                  <Button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-bold rounded-lg min-h-[52px] w-full max-w-sm shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
                    📞 Book My Free Audit Now
                  </Button>
                  <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">
                    30 minutes • $297 value • No pitch, just results
                  </p>
                </div>

                {/* Enhanced Quote Box */}
                <div className="bg-gray-900 text-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl mx-2 sm:mx-0">
                  <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💼 I Do What It Takes. Period.</h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    I can run your excavator, install a new electrical panel, code your website, close your clients, or
                    change the oil in your limo. Whatever it takes to make your business work for you—not the other way
                    around.
                  </p>
                </div>

                {/* Enhanced Credentials */}
                <div className="text-center px-4">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Founder & Lead Consultant</h4>
                  <p className="text-base sm:text-lg text-gray-600 mb-1">Engineered Success Sales</p>
                  <p className="text-sm text-gray-500">15+ Years | Blue-Collar to Boardroom</p>
                </div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="order-2 lg:order-1">
              <div className="max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center lg:text-left">
                  👊 Why Book With Me?
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-200 hover:scale-105">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      15+ Years in the Trenches
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      From blue-collar job sites to boardrooms, I've helped build and scale businesses that actually
                      work. I don't just consult—I've lived it.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-200 hover:scale-105">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Built Sales Teams That Deliver
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      My last client doubled revenue in under 12 months. I engineer systems that make your team
                      consistent closers, not guessers.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-200 hover:scale-105">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Think You Need More Leads?
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Maybe. Or maybe you're leaking profit on every quote. I help owners plug the holes, follow up like
                      pros, and turn existing traffic into real booked jobs.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-200 hover:scale-105">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Hands-On, No-Fluff Approach
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      I've dug trenches, installed lighting, written the CRM code, and closed five-figure deals the same
                      week. If it doesn't produce, I don't pitch it.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-200 hover:scale-105">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Your Business, Engineered for Success
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      I don't sell cookie-cutter solutions. Every business is different, and I engineer custom systems
                      that fit your specific challenges and opportunities.
                    </p>
                  </div>
                </div>

                {/* Mobile CTA in Content Section */}
                <div className="mt-8 text-center lg:hidden">
                  <Button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-8 py-4 text-lg font-bold rounded-lg min-h-[52px] w-full max-w-sm shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
                    📋 Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="w-full bg-red-600 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Stop Leaking Leads?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-red-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Book your free 30-minute Sales Leak Audit and walk away with a clear action plan to fix what's broken.
          </p>

          <div className="space-y-4 sm:space-y-6">
            <Button className="bg-white hover:bg-gray-100 active:bg-gray-200 text-red-600 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-lg min-h-[52px] sm:min-h-[60px] w-full max-w-md shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95">
              📞 Book My Free Audit ($297 Value)
            </Button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-red-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm sm:text-base">30 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm sm:text-base">No Pitch</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="text-sm sm:text-base">Immediate Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="w-full bg-gray-900 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center">
            <img
              src="/images/ess-logo.png"
              alt="Engineered Success Sales"
              className="h-12 sm:h-16 w-auto mx-auto mb-4 sm:mb-6"
            />
            <p className="text-gray-400 text-sm sm:text-base mb-4">
              Engineered Success Sales - Building Systems That Work
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">© 2025 Engineered Success Sales. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
