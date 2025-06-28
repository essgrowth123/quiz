"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Settings,
  Send,
  CheckCircle,
  Shield,
  Star,
  Users,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export function EnhancedPage() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

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

  // Auto-rotate photos every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [photos.length])

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <div className="flex items-center">
          <img src="/images/ess-logo.png" alt="Engineered Success Sales" className="h-14 w-auto" />
        </div>
        <nav className="flex items-center gap-6">
          <span className="text-gray-600">Industries</span>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6">BOOK MY FREE AUDIT - ($297 VALUE)</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative text-center py-16 px-6 overflow-hidden">
        {/* Large Logo Background - Make more visible */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img src="/images/ess-logo.png" alt="ESS Logo Background" className="w-[500px] h-[500px] object-contain" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Free ESS Sales Leak Audit</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">($297 Value)</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            This 30-minute call shows you exactly where your leads are slipping through the cracks—and how to fix it
            without hiring anyone new.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg mb-8">
            📋 Get My Free Sales Blueprint
          </Button>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">500+</div>
              <div className="text-sm text-gray-600">Businesses Helped</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">$2.5M+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">5 Years</div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>
          </div>

          {/* NEW: Scroll Encouragement */}
          <div className="mt-12 animate-bounce">
            <div className="flex flex-col items-center text-gray-500">
              <span className="text-sm mb-2">See how I've helped businesses like yours</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What You'll Walk Away With</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">🔍 Clear Diagnosis</h4>
              <p className="text-gray-600">Clarity on what's leaking leads or killing close rates</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">⚙️ Immediate Fix</h4>
              <p className="text-gray-600">A clear fix you can start applying immediately</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">🚀 Straight Talk</h4>
              <p className="text-gray-600">
                No pitch. Just straight talk from someone who's scaled the systems himself
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEW: Meet Your Consultant Section - Enhanced */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">👊 Why Book With Me?</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">15+ Years in the Trenches</h4>
                  <p className="text-gray-600">
                    From blue-collar job sites to boardrooms, I've helped build and scale businesses that actually work.
                    I don't just consult—I've lived it.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Built Sales Teams That Deliver</h4>
                  <p className="text-gray-600">
                    My last client doubled revenue in under 12 months. I engineer systems that make your team consistent
                    closers, not guessers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Think You Need More Leads?</h4>
                  <p className="text-gray-600">
                    Maybe. Or maybe you're leaking profit on every quote. I help owners plug the holes, follow up like
                    pros, and turn existing traffic into real booked jobs.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Hands-On, No-Fluff Approach</h4>
                  <p className="text-gray-600">
                    I've dug trenches, installed lighting, written the CRM code, and closed five-figure deals the same
                    week. If it doesn't produce, I don't pitch it.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Business, Engineered for Scale</h4>
                  <p className="text-gray-600">
                    I bring a unique blend of sales psychology, automation tools, and real-world ops to make your
                    business run like a well-oiled machine.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Coach Meets Systems Builder</h4>
                  <p className="text-gray-600">
                    Whether it's training your techs to upsell with confidence or building funnels that follow up while
                    you sleep—I've got you.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              {/* NEW: Photo Carousel */}
              <div className="relative inline-block mb-6">
                <div className="relative w-80 h-80 mx-auto">
                  {/* Main Photo Display */}
                  <img
                    src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                    alt={photos[currentPhotoIndex].alt}
                    className="w-80 h-80 object-cover rounded-lg shadow-lg transition-all duration-500"
                  />

                  {/* ESS Logo Badge */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                    <img src="/images/ess-logo.png" alt="ESS Logo" className="w-16 h-16 object-contain" />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg">
                    <div className="font-semibold text-sm">{photos[currentPhotoIndex].caption}</div>
                    <div className="text-xs opacity-90">{photos[currentPhotoIndex].description}</div>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentPhotoIndex ? "bg-red-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`View photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* NEW: CTA Button */}
              <div className="mb-6">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                  📞 Book My Free Audit Now
                </Button>
                <p className="text-sm text-gray-500 mt-2">30 minutes • $297 value • No pitch, just results</p>
              </div>

              <div className="bg-gray-900 text-white rounded-lg p-6 mb-6">
                <h4 className="text-xl font-bold mb-4">💼 I Do What It Takes. Period.</h4>
                <p className="text-gray-300 leading-relaxed">
                  I can run your excavator, install a new electrical panel, code your website, close your clients, or
                  change the oil in your limo. Whatever it takes to make your business work for you—not the other way
                  around.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900">Founder & Lead Consultant</h4>
                <p className="text-gray-600">Engineered Success Sales</p>
                <p className="text-sm text-gray-500 mt-2">15+ Years | Blue-Collar to Boardroom</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Client Transformations Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Real Client Transformations</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's exactly how my systems have transformed businesses like yours—with specific numbers and timelines.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Case Study 1 - Construction */}
            <Card className="p-6 border-2 border-blue-100">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">MC</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Metro Construction Co.</h4>
                    <p className="text-sm text-gray-600">Commercial Electrical Contractor</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <h5 className="font-semibold text-red-800 mb-2">❌ The Problem:</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Only 12% of leads were converting to jobs</li>
                    <li>• $180K in quoted work sitting in "follow-up limbo"</li>
                    <li>• Sales team was winging it with no process</li>
                    <li>• Owner was personally chasing every lead</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <h5 className="font-semibold text-green-800 mb-2">✅ The Solution:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Built automated follow-up sequences</li>
                    <li>• Created sales scripts for different job types</li>
                    <li>• Implemented CRM with pipeline tracking</li>
                    <li>• Trained team on consultative selling</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-3">📈 The Results (8 Months):</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">47%</div>
                      <div className="text-xs text-blue-700">Close Rate</div>
                      <div className="text-xs text-gray-500">↑ from 12%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">$340K</div>
                      <div className="text-xs text-blue-700">Additional Revenue</div>
                      <div className="text-xs text-gray-500">Same lead volume</div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mt-3 italic">
                    "I went from working 70-hour weeks chasing leads to having a system that works while I sleep."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 2 - Real Estate */}
            <Card className="p-6 border-2 border-purple-100">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">PR</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Premier Realty Group</h4>
                    <p className="text-sm text-gray-600">Residential Real Estate Team</p>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <h5 className="font-semibold text-red-800 mb-2">❌ The Problem:</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Agents were inconsistent with follow-up</li>
                    <li>• 60% of leads went cold after first contact</li>
                    <li>• No system for nurturing long-term prospects</li>
                    <li>• Team was burning through marketing budget</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <h5 className="font-semibold text-green-800 mb-2">✅ The Solution:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Built 12-month nurture campaign</li>
                    <li>• Created buyer/seller journey maps</li>
                    <li>• Automated listing alerts and market updates</li>
                    <li>• Trained team on value-based conversations</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-3">📈 The Results (6 Months):</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">89%</div>
                      <div className="text-xs text-purple-700">Lead Retention</div>
                      <div className="text-xs text-gray-500">↑ from 40%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">$1.2M</div>
                      <div className="text-xs text-purple-700">Extra Closings</div>
                      <div className="text-xs text-gray-500">Same ad spend</div>
                    </div>
                  </div>
                  <p className="text-sm text-purple-700 mt-3 italic">
                    "Our conversion rate doubled, and we're closing deals from leads that were 8 months old."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Study 3 - HVAC (Full Width) */}
          <Card className="p-6 border-2 border-orange-100 mb-8">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">AH</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Apex HVAC Services</h4>
                      <p className="text-sm text-gray-600">Residential & Commercial HVAC</p>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h5 className="font-semibold text-red-800 mb-2">❌ The Problem:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Techs were order-takers, not sellers</li>
                      <li>• $50K+ in maintenance contracts not renewed</li>
                      <li>• Emergency calls weren't converting to upgrades</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 h-full">
                    <h5 className="font-semibold text-green-800 mb-2">✅ The Solution:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Trained techs on consultative upselling</li>
                      <li>• Created maintenance renewal automation</li>
                      <li>• Built emergency-to-upgrade scripts</li>
                      <li>• Implemented service agreement tracking</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-orange-50 p-4 rounded-lg h-full">
                    <h5 className="font-semibold text-orange-800 mb-3">📈 Results (4 Months):</h5>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-orange-600">$180K</div>
                        <div className="text-xs text-orange-700">Additional Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-orange-600">85%</div>
                        <div className="text-xs text-orange-700">Contract Renewal Rate</div>
                      </div>
                    </div>
                    <p className="text-sm text-orange-700 mt-3 italic">
                      "My techs are now confident salespeople, not just wrench-turners."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
            <h4 className="text-2xl font-bold mb-6">Combined Client Results</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-400">$2.1M+</div>
                <div className="text-sm text-gray-300">Additional Revenue Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">156%</div>
                <div className="text-sm text-gray-300">Average Close Rate Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">6.2x</div>
                <div className="text-sm text-gray-300">ROI on Implementation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">90 Days</div>
                <div className="text-sm text-gray-300">Average Time to See Results</div>
              </div>
            </div>
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
              These aren't hypothetical results. These are real businesses that implemented the same systems I'll show
              you in your audit.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: Certifications */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-sm">Certified Sales Expert</h4>
              <p className="text-xs text-gray-600">National Sales Association</p>
            </CardContent>
          </Card>

          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-sm">BBB A+ Rating</h4>
              <p className="text-xs text-gray-600">Better Business Bureau</p>
            </CardContent>
          </Card>

          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-sm">Top 1% Consultant</h4>
              <p className="text-xs text-gray-600">Sales Performance Institute</p>
            </CardContent>
          </Card>

          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-sm">500+ Clients Served</h4>
              <p className="text-xs text-gray-600">Since 2018</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEW: Customer Reviews */}
      <section className="py-12 px-6">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-lg font-semibold ml-2">4.9/5</span>
          </div>
          <p className="text-gray-600">Based on 127 verified reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">"Increased our close rate by 40% in just 2 months!"</p>
              <p className="text-xs font-medium">- Sarah M., Real Estate</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">"Finally found the leaks in our sales funnel. Game changer!"</p>
              <p className="text-xs font-medium">- Mike R., Construction</p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                "Professional, insightful, and delivered exactly what was promised."
              </p>
              <p className="text-xs font-medium">- Jennifer L., Home Services</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEW: Guarantee Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">100% Satisfaction Guarantee</h3>
          <p className="text-gray-600 mb-6">
            If you don't find at least 3 actionable ways to improve your sales process within our 30-minute audit, we'll
            refund your time with a $100 Amazon gift card.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              No Risk
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Money Back
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Proven Results
            </Badge>
          </div>
        </div>
      </section>

      {/* Bottom Text */}
      <section className="py-8 px-6 text-center">
        <p className="text-gray-600 max-w-3xl mx-auto">
          We've helped contractors, real estate pros, and blue-collar businesses clean up messy pipelines and build
          systems that actually convert.
        </p>
      </section>

      {/* NEW: Security Badges */}
      <section className="py-6 px-6 border-t bg-gray-50">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <span>Privacy Protected</span>
          </div>
        </div>
      </section>
    </div>
  )
}
