import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

interface HeroSectionProps {
  industry: string
  headline: string
  subheadline: string
  benefits: string[]
  formTitle: string
  formDescription: string
  businessLabel: string
}

export function HeroSection({
  industry,
  headline,
  subheadline,
  benefits,
  formTitle,
  formDescription,
  businessLabel,
}: HeroSectionProps) {
  return (
    <section className="section-spacing bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                {headline}
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {subheadline}
              </p>

              {/* Benefits List */}
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 text-left">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-[#FFCC00]" />
                    <p className="text-base sm:text-lg text-gray-600">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Button variant="primary" size="xl" asChild>
                  <a href="/book">📞 Book My Free Audit – ($297 Value)</a>
                </Button>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="lg:pl-8">
              <Card className="shadow-2xl border-0 bg-white" id="lead-form">
                <CardContent className="p-6 lg:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{formTitle}</h3>
                    <p className="text-base sm:text-lg text-gray-600">{formDescription}</p>
                  </div>

                  <form action="/api/webhook" method="POST" className="space-y-6">
                    <input type="hidden" name="industry" value={industry} />

                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-base font-medium text-gray-700 block text-center lg:text-left"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-medium text-gray-700 block text-center lg:text-left"
                      >
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="business"
                        className="text-base font-medium text-gray-700 block text-center lg:text-left"
                      >
                        {businessLabel}
                      </Label>
                      <Input
                        id="business"
                        name="business"
                        type="text"
                        required
                        className="h-12 text-base border-2 focus:border-[#FFCC00] text-center"
                        placeholder={`Enter your ${businessLabel.toLowerCase()}`}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="xl" className="w-full">
                      📩 Get My Free Sales Blueprint
                    </Button>

                    <p className="text-sm text-center leading-relaxed text-gray-500">
                      By submitting, you agree to receive communications from ESS. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
