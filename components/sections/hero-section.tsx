// This is a Server Component
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{headline}</h1>
            <p className="text-xl text-gray-600 mb-8">{subheadline}</p>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold" asChild>
              <a href="#lead-form">📞 Book My Free Audit – ($297 Value)</a>
            </Button>
          </div>
          <div>
            <Card className="shadow-xl" id="lead-form">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{formTitle}</h3>
                <p className="text-gray-600 mb-6">{formDescription}</p>
                <form action="/api/webhook" method="POST" className="space-y-4">
                  <input type="hidden" name="industry" value={industry} />
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Smith" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="(555) 123-4567" required />
                  </div>
                  <div>
                    <Label htmlFor="business">{businessLabel}</Label>
                    <Input id="business" name="business" placeholder="Your Business Name" required />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                    📩 Get My Free Sales Blueprint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
