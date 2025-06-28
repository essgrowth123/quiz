"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "./Navigation"
import { CheckCircle, Star, Building2, Wrench, Home, Factory, Car, Heart } from "lucide-react"

interface IndustryPageProps {
  industry: string
}

export default function IndustryPage({ industry }: IndustryPageProps) {
  const industryData = {
    healthcare: {
      name: "Healthcare",
      icon: Heart,
      hero: {
        title: "Healthcare Sales Systems That Work",
        subtitle: "Helping Medical Practices & Healthcare Services Convert More Patients",
        description:
          "From patient acquisition to retention, we help healthcare providers build ethical, effective sales systems that grow their practice while maintaining trust.",
      },
      challenges: [
        "Patient acquisition costs are rising",
        "Insurance changes affecting revenue",
        "Competition from larger healthcare systems",
        "Difficulty converting consultations to treatments",
        "Patient retention and referral challenges",
      ],
      solutions: [
        "Patient journey optimization",
        "Referral system automation",
        "Insurance verification workflows",
        "Follow-up sequences for treatments",
        "Patient satisfaction tracking",
      ],
      results: {
        clients: "40+",
        revenue: "$800K+",
        improvement: "65%",
        timeframe: "6 months",
      },
      testimonial: {
        quote:
          "Our patient conversion rate increased by 45% and we're booking 30% more consultations with the same marketing budget.",
        author: "Dr. Sarah Chen, Wellness Medical Center",
      },
    },
    construction: {
      name: "Construction",
      icon: Building2,
      hero: {
        title: "Construction Sales Systems That Build Success",
        subtitle: "Helping Contractors & Trade Professionals Close More Jobs",
        description:
          "From lead generation to project completion, we help construction companies build systems that turn estimates into signed contracts and referrals.",
      },
      challenges: [
        "Low conversion rates on estimates",
        "Long sales cycles for big projects",
        "Seasonal revenue fluctuations",
        "Competition from low-ball competitors",
        "Difficulty following up on quotes",
      ],
      solutions: [
        "Estimate-to-contract optimization",
        "Seasonal planning systems",
        "Value-based selling training",
        "Automated follow-up sequences",
        "Referral generation programs",
      ],
      results: {
        clients: "150+",
        revenue: "$2.1M+",
        improvement: "180%",
        timeframe: "8 months",
      },
      testimonial: {
        quote:
          "We went from 12% close rate to 47% in 8 months. The follow-up system alone recovered $180K in quoted work that was sitting in limbo.",
        author: "Mike Rodriguez, Metro Construction Co.",
      },
    },
    "real-estate": {
      name: "Real Estate",
      icon: Home,
      hero: {
        title: "Real Estate Sales Systems That Close Deals",
        subtitle: "Helping Agents & Brokers Convert More Leads Into Closings",
        description:
          "From lead nurturing to closing, we help real estate professionals build systems that turn prospects into clients and clients into referrals.",
      },
      challenges: [
        "Inconsistent lead follow-up",
        "Long nurture cycles for buyers/sellers",
        "High marketing costs with low ROI",
        "Difficulty staying top-of-mind",
        "Seasonal market fluctuations",
      ],
      solutions: [
        "12-month nurture campaigns",
        "Buyer/seller journey automation",
        "Market update systems",
        "Referral generation programs",
        "Lead scoring and prioritization",
      ],
      results: {
        clients: "80+",
        revenue: "$50M+",
        improvement: "120%",
        timeframe: "6 months",
      },
      testimonial: {
        quote:
          "Our conversion rate doubled and we're closing deals from leads that were 8 months old. The nurture system is a game-changer.",
        author: "Jennifer Martinez, Premier Realty Group",
      },
    },
    "home-services": {
      name: "Home Services",
      icon: Wrench,
      hero: {
        title: "Home Services Sales Systems That Work",
        subtitle: "Helping Service Companies Convert Calls Into Customers",
        description:
          "From emergency calls to maintenance contracts, we help home service companies build systems that maximize every customer interaction.",
      },
      challenges: [
        "Emergency calls not converting to upgrades",
        "Seasonal service fluctuations",
        "Technicians are order-takers, not sellers",
        "Maintenance contract renewals",
        "Competition from online platforms",
      ],
      solutions: [
        "Emergency-to-upgrade scripts",
        "Maintenance contract automation",
        "Technician sales training",
        "Service agreement tracking",
        "Customer retention programs",
      ],
      results: {
        clients: "200+",
        revenue: "$1.2M+",
        improvement: "85%",
        timeframe: "4 months",
      },
      testimonial: {
        quote:
          "My techs went from order-takers to confident salespeople. We added $180K in additional revenue in just 4 months.",
        author: "Tom Wilson, Apex HVAC Services",
      },
    },
    manufacturing: {
      name: "Manufacturing",
      icon: Factory,
      hero: {
        title: "Manufacturing Sales Systems That Scale",
        subtitle: "Helping Manufacturers Build B2B Sales That Deliver",
        description:
          "From lead qualification to contract negotiation, we help manufacturers build systems that turn prospects into long-term partners.",
      },
      challenges: [
        "Long B2B sales cycles",
        "Complex multi-stakeholder decisions",
        "Price-focused competition",
        "Difficulty demonstrating ROI",
        "Account management challenges",
      ],
      solutions: [
        "B2B sales process optimization",
        "Stakeholder mapping systems",
        "ROI calculation tools",
        "Account management workflows",
        "Partnership development programs",
      ],
      results: {
        clients: "25+",
        revenue: "$5.2M+",
        improvement: "95%",
        timeframe: "12 months",
      },
      testimonial: {
        quote:
          "Our average deal size increased by 40% and our sales cycle shortened by 3 months. The ROI tools made all the difference.",
        author: "David Park, Industrial Solutions Inc.",
      },
    },
    automotive: {
      name: "Automotive",
      icon: Car,
      hero: {
        title: "Automotive Sales Systems That Drive Results",
        subtitle: "Helping Auto Dealers & Service Centers Increase Sales",
        description:
          "From showroom to service bay, we help automotive businesses build systems that maximize every customer touchpoint.",
      },
      challenges: [
        "Online competition affecting foot traffic",
        "Service upselling opportunities missed",
        "Customer retention after purchase",
        "Financing and warranty objections",
        "Seasonal sales fluctuations",
      ],
      solutions: [
        "Digital-to-showroom conversion",
        "Service-to-sales integration",
        "Customer lifecycle management",
        "Objection handling systems",
        "Seasonal campaign automation",
      ],
      results: {
        clients: "80+",
        revenue: "$3.8M+",
        improvement: "110%",
        timeframe: "9 months",
      },
      testimonial: {
        quote: "We increased our service-to-sales conversion by 60% and our customer retention improved dramatically.",
        author: "Lisa Thompson, Metro Auto Group",
      },
    },
  }

  const data = industryData[industry as keyof typeof industryData]
  const IconComponent = data.icon

  if (!data) {
    return <div>Industry not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{data.hero.title}</h1>
                </div>
              </div>
              <h2 className="text-2xl text-red-600 font-semibold mb-6">{data.hero.subtitle}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{data.hero.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                    📋 Get Your Free {data.name} Sales Audit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Card className="p-8 bg-white shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.name} Results</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{data.results.clients}</div>
                      <div className="text-sm text-gray-600">Clients Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{data.results.revenue}</div>
                      <div className="text-sm text-gray-600">Revenue Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{data.results.improvement}</div>
                      <div className="text-sm text-gray-600">Avg. Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{data.results.timeframe}</div>
                      <div className="text-sm text-gray-600">Avg. Timeline</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Common {data.name} Sales Challenges</h3>
            <p className="text-xl text-gray-600">
              We understand the unique challenges facing {data.name.toLowerCase()} businesses—because we've solved them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenges */}
            <Card className="p-8 border-2 border-red-100">
              <CardContent className="p-0">
                <h4 className="text-2xl font-bold text-red-800 mb-6">❌ The Problems:</h4>
                <div className="space-y-4">
                  {data.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card className="p-8 border-2 border-green-100">
              <CardContent className="p-0">
                <h4 className="text-2xl font-bold text-green-800 mb-6">✅ Our Solutions:</h4>
                <div className="space-y-4">
                  {data.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{solution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl text-gray-800 mb-6 italic leading-relaxed">
            "{data.testimonial.quote}"
          </blockquote>
          <p className="text-lg font-semibold text-gray-600">— {data.testimonial.author}</p>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">How We Help {data.name} Businesses</h3>
            <p className="text-xl text-gray-600">
              Our proven 3-step process for {data.name.toLowerCase()} sales success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h4 className="text-xl font-bold mb-4">🔍 Sales Leak Audit</h4>
                <p className="text-gray-600">
                  We analyze your current {data.name.toLowerCase()} sales process to identify exactly where leads are
                  being lost and revenue is leaking.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <h4 className="text-xl font-bold mb-4">⚙️ System Implementation</h4>
                <p className="text-gray-600">
                  We build and implement {data.name.toLowerCase()}-specific sales systems, automation, and processes
                  that work for your business.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <h4 className="text-xl font-bold mb-4">🚀 Team Training</h4>
                <p className="text-gray-600">
                  We train your team on {data.name.toLowerCase()}-specific sales techniques and ensure they can
                  effectively use the new systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your {data.name} Sales?</h3>
          <p className="text-xl mb-8 opacity-90">
            Book your free 30-minute {data.name} Sales Leak Audit and discover exactly where your business is losing
            money—and how to fix it.
          </p>

          <Link to="/book">
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              📋 Get Your Free {data.name} Sales Audit ($297 Value)
            </Button>
          </Link>

          <p className="text-sm mt-4 opacity-75">
            30 minutes • No pitch • {data.name}-specific insights • 100% satisfaction guarantee
          </p>
        </div>
      </section>
    </div>
  )
}
