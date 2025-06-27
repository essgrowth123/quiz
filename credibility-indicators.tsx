import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Star, Users, Award, TrendingUp } from "lucide-react"

export default function CredibilityIndicators() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-12">
      {/* Client Logos Section */}
      <section className="text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-6">Trusted by Industry Leaders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
          {[
            "ABC Construction",
            "Premier Realty",
            "Elite Contractors",
            "Metro Properties",
            "BuildRight Co",
            "Success Sales Inc",
          ].map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500 text-center px-2">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Badges */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Certified Sales Expert</h4>
            <p className="text-xs text-gray-600">National Sales Association</p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">BBB A+ Rating</h4>
            <p className="text-xs text-gray-600">Better Business Bureau</p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Top 1% Consultant</h4>
            <p className="text-xs text-gray-600">Sales Performance Institute</p>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="p-0">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">500+ Clients Served</h4>
            <p className="text-xs text-gray-600">Since 2018</p>
          </CardContent>
        </Card>
      </section>

      {/* Guarantee Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
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

      {/* Social Proof Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-600">500+</div>
          <div className="text-sm text-gray-600">Businesses Helped</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-600">$2.5M+</div>
          <div className="text-sm text-gray-600">Revenue Generated</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-600">98%</div>
          <div className="text-sm text-gray-600">Client Satisfaction</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-red-600">5 Years</div>
          <div className="text-sm text-gray-600">Industry Experience</div>
        </div>
      </section>

      {/* Reviews/Ratings */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-lg font-semibold ml-2">4.9/5</span>
          </div>
          <p className="text-gray-600">Based on 127 verified reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">"Increased our close rate by 40% in just 2 months!"</p>
            <p className="text-xs font-medium">- Sarah M., Real Estate</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">"Finally found the leaks in our sales funnel. Game changer!"</p>
            <p className="text-xs font-medium">- Mike R., Construction</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              "Professional, insightful, and delivered exactly what was promised."
            </p>
            <p className="text-xs font-medium">- Jennifer L., Home Services</p>
          </div>
        </div>
      </section>

      {/* Security/Privacy Badges */}
      <section className="flex flex-wrap justify-center items-center gap-8 py-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-5 h-5 text-green-600" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <span>GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-5 h-5 text-purple-600" />
          <span>Privacy Protected</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award className="w-5 h-5 text-orange-600" />
          <span>Verified Business</span>
        </div>
      </section>
    </div>
  )
}
