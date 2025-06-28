"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "../components/Navigation"
import {
  Search,
  Settings,
  Send,
  CheckCircle,
  ArrowRight,
  Building2,
  Wrench,
  Home,
  Factory,
  Car,
  Heart,
} from "lucide-react"

export default function Homepage() {
  const industries = [
    {
      name: "Healthcare",
      href: "/industries/healthcare",
      icon: Heart,
      description: "Medical practices, clinics, and healthcare services",
      stats: "40+ clients served",
    },
    {
      name: "Construction",
      href: "/industries/construction",
      icon: Building2,
      description: "General contractors, electrical, plumbing, and specialty trades",
      stats: "150+ projects completed",
    },
    {
      name: "Real Estate",
      href: "/industries/real-estate",
      icon: Home,
      description: "Agents, brokers, property management, and real estate teams",
      stats: "$50M+ in sales generated",
    },
    {
      name: "Home Services",
      href: "/industries/home-services",
      icon: Wrench,
      description: "HVAC, landscaping, cleaning, and home improvement services",
      stats: "200+ service calls optimized",
    },
    {
      name: "Manufacturing",
      href: "/industries/manufacturing",
      icon: Factory,
      description: "Industrial equipment, B2B manufacturing, and supply chain",
      stats: "25+ manufacturers helped",
    },
    {
      name: "Automotive",
      href: "/industries/automotive",
      icon: Car,
      description: "Auto dealers, repair shops, and automotive service centers",
      stats: "80+ dealerships served",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50">
        {/* Large Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/images/ess-logo.png" alt="ESS Logo Background" className="w-[600px] h-[600px] object-contain" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Engineered Success Sales</h1>
          <h2 className="text-2xl md:text-3xl text-red-600 font-semibold mb-8">Sales Systems That Actually Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We help blue-collar businesses and service companies build sales systems that convert leads into
            customers—without the fluff, without the pitch, just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/book">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold">
                📋 Get Your Free Sales Audit ($297 Value)
              </Button>
            </Link>
            <p className="text-sm text-gray-500">30-minute call • No pitch • Just actionable insights</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-sm text-gray-600">Businesses Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">$2.5M+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in helping service-based and blue-collar businesses across these key industries build sales
              systems that actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => {
              const IconComponent = industry.icon
              return (
                <Link key={industry.href} href={industry.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-red-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{industry.name}</h4>
                          <p className="text-sm text-red-600 font-medium">{industry.stats}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{industry.description}</p>
                      <div className="flex items-center text-red-600 font-medium">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">What We Do</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just consult—we build systems that work. Here's how we help businesses like yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-2xl font-bold mb-4">🔍 Sales Leak Audit</h4>
                <p className="text-gray-600 mb-6">
                  We identify exactly where your leads are slipping through the cracks and show you how to plug the
                  holes.
                </p>
                <Link href="/book">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Get Your Free Audit
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-2xl font-bold mb-4">⚙️ System Implementation</h4>
                <p className="text-gray-600 mb-6">
                  We build and implement sales systems, CRMs, and automation that work for your specific business.
                </p>
                <Button variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-2xl font-bold mb-4">🚀 Team Training</h4>
                <p className="text-gray-600 mb-6">
                  We train your team to use the systems effectively and turn them into confident closers.
                </p>
                <Button variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">Why Choose Engineered Success Sales?</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">15+ Years in the Trenches</h4>
                    <p className="text-gray-600">
                      From blue-collar job sites to boardrooms, I've built and scaled businesses that actually work. I
                      don't just consult—I've lived it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No-Fluff Approach</h4>
                    <p className="text-gray-600">
                      I've dug trenches, installed lighting, written CRM code, and closed five-figure deals. If it
                      doesn't produce results, I don't pitch it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h4>
                    <p className="text-gray-600">
                      My last client doubled revenue in under 12 months. I engineer systems that make your team
                      consistent closers, not guessers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <img
                src="/images/headshot.jpg"
                alt="Professional Sales Consultant"
                className="w-80 h-80 object-cover rounded-lg shadow-lg mx-auto mb-6"
              />
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <h4 className="text-xl font-bold mb-4">💼 I Do What It Takes. Period.</h4>
                <p className="text-gray-300 leading-relaxed">
                  I can run your excavator, install a new electrical panel, code your website, close your clients, or
                  change the oil in your limo. Whatever it takes to make your business work for you—not the other way
                  around.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Stop Leaking Leads?</h3>
          <p className="text-xl mb-8 opacity-90">
            Book your free 30-minute Sales Leak Audit and discover exactly where your business is losing money—and how
            to fix it.
          </p>

          <Link href="/book">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              📋 Get Your Free Sales Audit ($297 Value)
            </Button>
          </Link>

          <p className="text-sm mt-4 opacity-75">
            30 minutes • No pitch • Just actionable insights • 100% satisfaction guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="/images/ess-logo.png"
                alt="Engineered Success Sales"
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">
                Sales systems that actually work for blue-collar and service-based businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <div className="space-y-2">
                {industries.slice(0, 3).map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">More Industries</h4>
              <div className="space-y-2">
                {industries.slice(3).map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <Link href="/book">
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full mb-4">Book Free Audit</Button>
              </Link>
              <p className="text-sm text-gray-400">
                15+ years experience
                <br />
                500+ businesses helped
                <br />
                $2.5M+ revenue generated
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Engineered Success Sales. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
